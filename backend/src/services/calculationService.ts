// File: src/services/calculationService.ts
import { RouteData, AircraftCost, HandlingRate, MarketBenchmark, SystemParameter, AirportCurrency } from '../models';
import { Op } from 'sequelize';
import { CalculationResult } from '../types/calculation';
import { analyzeDemand, DemandAnalysis } from './demandService';

export const calculateShouldCost = async (
  originCode: string,
  destinationCode: string,
  isPreScreened: boolean,
  handlingModel: 'DAA' | 'FF'
): Promise<CalculationResult> => {
  try {
    // Step 1: Get route averages
    const routes = await RouteData.findAll({
      where: {
        codeDep: originCode,
        codeArr: destinationCode,
      },
    });

    if (routes.length === 0) {
      throw new Error('No routes found for this origin-destination pair');
    }

    const avgCapacityTonnes = routes.reduce((sum: number, r: any) => sum + parseFloat(r.capacityTonnes), 0) / routes.length;
    const avgCapacityKg = avgCapacityTonnes * 1000;
    const avgBlockHours = routes.reduce((sum: number, r: any) => sum + parseFloat(r.blockHours), 0) / routes.length;
    const distance = routes[0].distanceKm;
    const carrierCount = new Set(routes.map((r: any) => r.carrierCode)).size;
    const weeklyFlights = routes.reduce((sum: number, r: any) => sum + r.weeklyFlightCount, 0);

    // Step 2: Get system parameters
    const params = await SystemParameter.findAll();
    const paramMap = new Map(params.map((p: any) => [p.parameterName, parseFloat(p.parameterValue)]));

    const cargoAllocationPct = paramMap.get('cargo_allocation_percentage') || 12;
    const currentFuelPrice = paramMap.get('current_fuel_price') || 0.77;
    const securityScreeningRate = paramMap.get('security_screening_rate') || 0.12;
    const documentationFee = paramMap.get('documentation_fee') || 30.0;
    const defaultMargin = paramMap.get('default_margin') || 20;

    // Step 3: Calculate flight operating cost per kg (EXCLUDING FUEL)
    const aircraftTypes = new Set(routes.map((r: any) => r.equip));
    
    let flightCostBreakdown = {
      crew: 0,
      maintenance: 0,
      depreciation: 0,
      insurance: 0,
      other: 0,
    };
    
    let totalFuelCostPerKg = 0;
    let aircraftCount = 0;

    for (const aircraftType of aircraftTypes) {
      const aircraftCost = await AircraftCost.findOne({
        where: { aircraftType },
      });

      if (aircraftCost) {
        aircraftCount++;
        const allocationFactor = cargoAllocationPct / 100;
        
        // Calculate NON-FUEL operating costs
        const crewCost = (parseFloat(aircraftCost.crewCost as any) * avgBlockHours * allocationFactor) / avgCapacityKg;
        const maintenanceCost = (parseFloat(aircraftCost.maintenanceCost as any) * avgBlockHours * allocationFactor) / avgCapacityKg;
        const depreciationCost = (parseFloat(aircraftCost.depreciationCost as any) * avgBlockHours * allocationFactor) / avgCapacityKg;
        const insuranceCost = (parseFloat(aircraftCost.insuranceCost as any) * avgBlockHours * allocationFactor) / avgCapacityKg;
        const otherCost = (parseFloat(aircraftCost.otherCost as any) * avgBlockHours * allocationFactor) / avgCapacityKg;

        flightCostBreakdown.crew += crewCost;
        flightCostBreakdown.maintenance += maintenanceCost;
        flightCostBreakdown.depreciation += depreciationCost;
        flightCostBreakdown.insurance += insuranceCost;
        flightCostBreakdown.other += otherCost;

        // Calculate FUEL cost separately using current fuel price and burn rate
        const fuelBurnRate = parseFloat(aircraftCost.fuelBurnRatePerHour as any);
        const fuelCostPerKg = (fuelBurnRate * avgBlockHours * currentFuelPrice * allocationFactor) / avgCapacityKg;
        totalFuelCostPerKg += fuelCostPerKg;
      }
    }

    // Average across aircraft types
    if (aircraftCount > 0) {
      flightCostBreakdown.crew /= aircraftCount;
      flightCostBreakdown.maintenance /= aircraftCount;
      flightCostBreakdown.depreciation /= aircraftCount;
      flightCostBreakdown.insurance /= aircraftCount;
      flightCostBreakdown.other /= aircraftCount;
      totalFuelCostPerKg /= aircraftCount;
    }

    // Flight operating cost = crew + maintenance + depreciation + insurance + other (NO FUEL)
    const flightCostPerKg = flightCostBreakdown.crew +
                           flightCostBreakdown.maintenance +
                           flightCostBreakdown.depreciation +
                           flightCostBreakdown.insurance +
                           flightCostBreakdown.other;

    // Step 4: Calculate handling cost per kg
    const originHandling = await HandlingRate.findOne({
      where: { airportCode: originCode },
    });
    const destHandling = await HandlingRate.findOne({
      where: { airportCode: destinationCode },
    });

    const originRatePerKg = originHandling ? parseFloat(originHandling.originRatePerKg as any) : 0;
    const destRatePerKg = handlingModel === 'FF' && destHandling ? parseFloat(destHandling.destinationRatePerKg as any) : 0;
    const securityCost = !isPreScreened ? securityScreeningRate : 0;

    // Step 5: Calculate documentation per kg
    const documentationPerKg = documentationFee / avgCapacityKg;

    // Step 6: Calculate base cost (all components are now separate and correct)
    const baseCostPerKg = flightCostPerKg +      // Crew + Maint + Deprec + Ins + Other
                         totalFuelCostPerKg +    // Fuel (separate)
                         originRatePerKg +       // Origin handling
                         destRatePerKg +         // Destination handling (if FF)
                         securityCost +          // Security screening
                         documentationPerKg;     // Documentation

    // Step 7: Add margin
    const marginPerKg = baseCostPerKg * (defaultMargin / 100);
    const shouldCostPerKg = baseCostPerKg + marginPerKg;

    // Step 8: Currency conversion
    const destCurrency = await AirportCurrency.findOne({
      where: { iataCode: destinationCode },
    });

    const currencyCode = destCurrency?.currencyCode || 'USD';
    const currencySymbol = destCurrency?.currencySymbol || '$';
    const exchangeRate = destCurrency ? parseFloat(destCurrency.exchangeRateToUsd as any) : 1;
    const shouldCostInDestCurrency = shouldCostPerKg * exchangeRate;

    // Step 9: Market comparison
    let marketRate: number | undefined;
    let variance: number | undefined;
    let assessment: string | undefined;

    const marketBenchmark = await MarketBenchmark.findOne({
      where: {
        originAirportCode: originCode,
        destinationAirportCode: destinationCode,
      },
      order: [['year', 'DESC'], ['month', 'DESC']],
    });

    if (marketBenchmark) {
      marketRate = parseFloat(marketBenchmark.totalRate as any);
      variance = ((marketRate - shouldCostPerKg) / shouldCostPerKg) * 100;

      if (variance < -5) {
        assessment = 'EXCELLENT VALUE';
      } else if (variance < 5) {
        assessment = 'FAIR PRICING';
      } else if (variance < 15) {
        assessment = 'SLIGHTLY OVERPRICED';
      } else if (variance < 25) {
        assessment = 'OVERPRICED';
      } else {
        assessment = 'HIGHLY OVERPRICED';
      }
    }

    // Step 10: Demand Analysis
    const demandAnalysis = analyzeDemand(
      originCode,
      destinationCode,
      shouldCostPerKg,
      carrierCount,
      weeklyFlights
    );

    // Build result with proper separation of costs
    const result: CalculationResult = {
      originCode,
      destinationCode,
      distance,
      avgCapacityKg: Math.round(avgCapacityKg * 100) / 100,
      avgBlockHours: Math.round(avgBlockHours * 100) / 100,
      carrierCount,
      weeklyFlights,
      
      // Flight operating cost (EXCLUDES fuel)
      flightCostPerKg: Math.round(flightCostPerKg * 100) / 100,
      flightCostBreakdown: {
        crew: Math.round(flightCostBreakdown.crew * 100) / 100,
        maintenance: Math.round(flightCostBreakdown.maintenance * 100) / 100,
        fuel: 0, // Not included in flight operating - shown separately
        depreciation: Math.round(flightCostBreakdown.depreciation * 100) / 100,
        insurance: Math.round(flightCostBreakdown.insurance * 100) / 100,
        other: Math.round(flightCostBreakdown.other * 100) / 100,
      },
      
      // Fuel cost (SEPARATE line item)
      actualFuelCostPerKg: Math.round(totalFuelCostPerKg * 100) / 100,
      
      // Handling costs
      originHandlingPerKg: Math.round(originRatePerKg * 100) / 100,
      destinationHandlingPerKg: Math.round(destRatePerKg * 100) / 100,
      
      // Other costs
      securityScreeningPerKg: Math.round(securityCost * 100) / 100,
      documentationPerKg: Math.round(documentationPerKg * 100) / 100,
      
      // Totals
      baseCostPerKg: Math.round(baseCostPerKg * 100) / 100,
      marginPerKg: Math.round(marginPerKg * 100) / 100,
      shouldCostPerKg: Math.round(shouldCostPerKg * 100) / 100,
      
      // Currency
      currencyCode,
      currencySymbol,
      shouldCostInDestCurrency: Math.round(shouldCostInDestCurrency * 100) / 100,
      
      // Market comparison
      marketRate: marketRate ? Math.round(marketRate * 100) / 100 : undefined,
      variance: variance ? Math.round(variance * 100) / 100 : undefined,
      assessment,
      
      // Demand analysis
      demandAnalysis,
    };

    return result;
  } catch (error) {
    console.error('Error in calculateShouldCost:', error);
    throw error;
  }
};