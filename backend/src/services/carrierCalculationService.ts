// File: src/services/carrierCalculationService.ts
import { RouteData, AircraftCost, HandlingRate, SystemParameter } from '../models';

export interface CarrierBreakdown {
  carrierCode: string;
  carrierName: string;
  aircraftType: string;
  weeklyFlights: number;
  capacityKg: number;
  blockHours: number;
  shouldCostPerKg: number;
}

export const calculateCarrierBreakdown = async (
  originCode: string,
  destinationCode: string,
  isPreScreened: boolean,
  handlingModel: 'DAA' | 'FF'
): Promise<CarrierBreakdown[]> => {
  try {
    // Get all routes for this origin-destination pair
    const routes = await RouteData.findAll({
      where: {
        codeDep: originCode,
        codeArr: destinationCode,
      },
    });

    if (routes.length === 0) {
      throw new Error('No routes found for this origin-destination pair');
    }

    // Get system parameters
    const params = await SystemParameter.findAll();
    const paramMap = new Map(params.map((p: any) => [p.parameterName, parseFloat(p.parameterValue)]));

    const cargoAllocationPct = paramMap.get('cargo_allocation_percentage') || 12;
    const currentFuelPrice = paramMap.get('current_fuel_price') || 0.77;
    const securityScreeningRate = paramMap.get('security_screening_rate') || 0.12;
    const documentationFee = paramMap.get('documentation_fee') || 30.0;
    const defaultMargin = paramMap.get('default_margin') || 20;

    // Get handling rates
    const originHandling = await HandlingRate.findOne({
      where: { airportCode: originCode },
    });
    const destHandling = await HandlingRate.findOne({
      where: { airportCode: destinationCode },
    });

    const originRatePerKg = originHandling ? parseFloat(originHandling.originRatePerKg as any) : 0;
    const destRatePerKg = handlingModel === 'FF' && destHandling ? parseFloat(destHandling.destinationRatePerKg as any) : 0;
    const securityCost = !isPreScreened ? securityScreeningRate : 0;

    // Group routes by carrier AND aircraft type
    const carrierAircraftMap = new Map<string, any[]>();

    routes.forEach((route: any) => {
      const key = `${route.carrierCode}|${route.equip}`;
      if (!carrierAircraftMap.has(key)) {
        carrierAircraftMap.set(key, []);
      }
      carrierAircraftMap.get(key)!.push(route);
    });

    const carrierBreakdowns: CarrierBreakdown[] = [];

    for (const [key, carrierAircraftRoutes] of carrierAircraftMap.entries()) {
      const [carrierCode, aircraftType] = key.split('|');
      const carrierName = carrierAircraftRoutes[0].carrier;

      // Calculate averages for this carrier + aircraft combination
      const avgCapacityTonnes = carrierAircraftRoutes.reduce(
        (sum: number, r: any) => sum + parseFloat(r.capacityTonnes),
        0
      ) / carrierAircraftRoutes.length;

      const avgCapacityKg = avgCapacityTonnes * 1000;

      const avgBlockHours = carrierAircraftRoutes.reduce(
        (sum: number, r: any) => sum + parseFloat(r.blockHours),
        0
      ) / carrierAircraftRoutes.length;

      const weeklyFlights = carrierAircraftRoutes.reduce(
        (sum: number, r: any) => sum + r.weeklyFlightCount,
        0
      );

      // Get aircraft costs for this specific aircraft type
      const aircraftCost = await AircraftCost.findOne({
        where: { aircraftType },
      });

      let flightCostPerKg = 0;
      let fuelCostPerKg = 0;

      if (aircraftCost) {
        const allocationFactor = cargoAllocationPct / 100;

        // Calculate NON-FUEL operating costs
        const crewCost = parseFloat(aircraftCost.crewCost as any);
        const maintenanceCost = parseFloat(aircraftCost.maintenanceCost as any);
        const depreciationCost = parseFloat(aircraftCost.depreciationCost as any);
        const insuranceCost = parseFloat(aircraftCost.insuranceCost as any);
        const otherCost = parseFloat(aircraftCost.otherCost as any);

        const nonFuelHourlyCost = crewCost + maintenanceCost + depreciationCost + insuranceCost + otherCost;
        flightCostPerKg = (nonFuelHourlyCost * avgBlockHours * allocationFactor) / avgCapacityKg;

        // Calculate FUEL cost separately
        const fuelBurnRate = parseFloat(aircraftCost.fuelBurnRatePerHour as any);
        fuelCostPerKg = (fuelBurnRate * avgBlockHours * currentFuelPrice * allocationFactor) / avgCapacityKg;
      }

      // Calculate total cost
      const documentationPerKg = documentationFee / avgCapacityKg;
      
      const baseCostPerKg = flightCostPerKg +
                           fuelCostPerKg +
                           originRatePerKg +
                           destRatePerKg +
                           securityCost +
                           documentationPerKg;

      const marginPerKg = baseCostPerKg * (defaultMargin / 100);
      const shouldCostPerKg = baseCostPerKg + marginPerKg;

      carrierBreakdowns.push({
        carrierCode,
        carrierName,
        aircraftType,
        weeklyFlights,
        capacityKg: Math.round(avgCapacityKg),
        blockHours: Math.round(avgBlockHours * 100) / 100,
        shouldCostPerKg: Math.round(shouldCostPerKg * 100) / 100,
      });
    }

    // Sort by carrier name, then by aircraft type
    carrierBreakdowns.sort((a, b) => {
      const carrierCompare = a.carrierName.localeCompare(b.carrierName);
      if (carrierCompare !== 0) return carrierCompare;
      return a.aircraftType.localeCompare(b.aircraftType);
    });

    return carrierBreakdowns;
  } catch (error) {
    console.error('Error calculating carrier breakdown:', error);
    throw error;
  }
};
