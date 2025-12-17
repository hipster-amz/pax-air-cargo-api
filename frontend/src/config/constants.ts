// API configuration
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://3.15.114.89:3000/api';

// Color scheme (matching your brand)
export const COLORS = {
  PRIMARY_ORANGE: '#FF9900',
  DARK_BLUE_GRAY: '#232f3e',
  BRIGHT_BLUE: '#146eb4',
  BLACK: '#000000',
  LIGHT_GRAY: '#f2f2f2',
  WHITE: '#FFFFFF',
};

// Airport list (23 airports from specification)
export const ORIGIN_AIRPORTS = [
  'LAX', 'JFK', 'ORD', 'MIA', 'SYD', 'ATL',
  'LHR', 'FRA', 'HND', 'MEL', 'TLV', 'DXB',
  'RUH', 'SIN', 'BOG', 'GRU', 'ICN', 'MNL',
  'AKL', 'CDG', 'EZE', 'HKG', 'SCL',
];

// Default system parameters
export const DEFAULT_SYSTEM_PARAMETERS = {
  security_screening_rate: 0.12,
  documentation_fee: 30.0,
  cargo_allocation_percentage: 12,
  fuel_impact_factor: 1.5,
  current_fuel_price: 0.77,
  default_margin: 20,
};

// Assessment thresholds for market comparison
export const ASSESSMENT_THRESHOLDS = {
  EXCELLENT_VALUE: -5,
  FAIR_PRICING: 5,
  SLIGHTLY_OVERPRICED: 15,
  OVERPRICED: 25,
};