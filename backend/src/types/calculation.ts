import { DemandAnalysis } from '../services/demandService';

export interface CalculationResult {
  originCode: string;
  destinationCode: string;
  distance: number;
  avgCapacityKg: number;
  avgBlockHours: number;
  carrierCount: number;
  weeklyFlights: number;
  
  flightCostPerKg: number;
  flightCostBreakdown: {
    crew: number;
    maintenance: number;
    fuel: number;
    depreciation: number;
    insurance: number;
    other: number;
  };
  
  actualFuelCostPerKg: number;
  originHandlingPerKg: number;
  destinationHandlingPerKg: number;
  securityScreeningPerKg: number;
  documentationPerKg: number;
  
  baseCostPerKg: number;
  marginPerKg: number;
  shouldCostPerKg: number;
  
  currencyCode: string;
  currencySymbol: string;
  shouldCostInDestCurrency: number;
  
  marketRate?: number;
  variance?: number;
  assessment?: string;
  
  demandAnalysis: DemandAnalysis;
}