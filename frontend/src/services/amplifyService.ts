import { generateClient } from 'aws-amplify/api';

const client = generateClient();

// Airport endpoints
export const getOriginAirports = async () => {
  try {
    const { data: items } = await client.models.AirportCurrency.list({});
    return items || [];
  } catch (error) {
    console.error('Error fetching origin airports:', error);
    return [];
  }
};

export const getDestinationAirports = async (origin: string) => {
  try {
    const { data: items } = await client.models.AirportCurrency.list({});
    return items || [];
  } catch (error) {
    console.error('Error fetching destination airports:', error);
    return [];
  }
};

// Aircraft costs
export const getAircraftCosts = async () => {
  try {
    const { data: items } = await client.models.AircraftCost.list({});
    return items || [];
  } catch (error) {
    console.error('Error fetching aircraft costs:', error);
    return [];
  }
};

// Handling rates
export const getHandlingRates = async () => {
  try {
    const { data: items } = await client.models.HandlingRate.list({});
    return items || [];
  } catch (error) {
    console.error('Error fetching handling rates:', error);
    return [];
  }
};

// Market benchmarks
export const getMarketBenchmarks = async () => {
  try {
    const { data: items } = await client.models.MarketBenchmark.list({});
    return items || [];
  } catch (error) {
    console.error('Error fetching market benchmarks:', error);
    return [];
  }
};

// System parameters endpoints
export const getSystemParameters = async () => {
  try {
    const { data: items } = await client.models.SystemParameter.list({});
    return items || [];
  } catch (error) {
    console.error('Error fetching system parameters:', error);
    return [];
  }
};

export const updateSystemParameter = async (id: string, paramValue: string) => {
  try {
    const result = await client.models.SystemParameter.update({
      id,
      paramValue,
    });
    return result.data;
  } catch (error) {
    console.error('Error updating system parameter:', error);
    throw error;
  }
};

// Route data
export const getRouteData = async () => {
  try {
    const { data: items } = await client.models.RouteData.list({});
    return items || [];
  } catch (error) {
    console.error('Error fetching route data:', error);
    return [];
  }
};

// Health check
export const healthCheck = async (): Promise<boolean> => {
  try {
    await client.models.SystemParameter.list({});
    return true;
  } catch {
    return false;
  }
};

export default client;
