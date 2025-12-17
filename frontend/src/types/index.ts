// Route data types
export interface RouteData {
  id: number;
  routeCode: string;
  carrierCode: string;
  carrier: string;
  operationRegion: string;
  equip: string;
  codeDep: string;
  codeArr: string;
  operationType: string;
  blockHours: number;
  distanceKm: number;
  capacityTonnes: number;
  capacityAtk: number;
  weeklyFlightCount: number;
}

// Market benchmark types
export interface MarketBenchmark {
  id: number;
  routeCode: string;
  originAirportCode: string;
  destinationAirportCode: string;
  year: number;
  month: number;
  totalRate: number;
}

// Aircraft costs
export interface AircraftCost {
  id: number;
  aircraftType: string;
  totalCostPerHour: number;
  crewCost: number;
  maintenanceCost: number;
  fuelCost: number;
  depreciationCost: number;
  insuranceCost: number;
  otherCost: number;
  fuelBurnRatePerHour: number;
}

// Handling rates
export interface HandlingRate {
  id: number;
  airportCode: string;
  airportName: string;
  city: string;
  country: string;
  region: string;
  originRatePerKg: number;
  destinationRatePerKg: number;
}

// Airport currency
export interface AirportCurrency {
  id: number;
  iataCode: string;
  cityName: string;
  country: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRateToUsd: number;
  region: string;
}

// System parameters
export interface SystemParameter {
  parameterName: string;
  parameterValue: number;
  unit: string;
  description: string;
  lastUpdated: string;
}

// Calculation result
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
  demandAnalysis?: DemandAnalysis;
}

// Demand Analysis types
export interface DemandAnalysis {
  corridorType: string;
  corridorName: string;
  corridorMarketShare: number;
  corridorYoyGrowth: number;
  currentMonth: number;
  seasonalityIndex: number;
  seasonalityDriver: string;
  seasonalityRateImpact: string;
  peakMonth: number;
  monthsUntilPeak: number;
  carrierCount: number;
  weeklyFlights: number;
  competitionLevel: string;
  competitionFactor: number;
  yieldPremium: number;
  combinedDemandFactor: number;
  demandAdjustedRate: number;
  demandLevel: 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';
  marketTiming: 'OFF_PEAK' | 'SHOULDER' | 'PEAK';
  demandExplanation: string;
  recommendation: string;
}

// Calculation parameters
export interface CalculationParams {
  originCode: string;
  destinationCode: string;
  isPreScreened: boolean;
  handlingModel: 'DAA' | 'FF';
}
export interface CarrierBreakdown {
  carrierCode: string;
  carrierName: string;
  aircraftType: string;
  weeklyFlights: number;
  capacityKg?: number;
  blockHours?: number;
  shouldCostPerKg: number;
}