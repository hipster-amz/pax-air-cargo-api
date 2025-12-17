import axios from 'axios';
import { API_BASE_URL } from '../config/constants';
import {
  CalculationParams,
  CalculationResult,
  SystemParameter,
  AirportCurrency,
  RouteData,
} from '../types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Airport endpoints
export const getOriginAirports = async (): Promise<AirportCurrency[]> => {
  try {
    const response = await apiClient.get('/airports/origins');
    return response.data;
  } catch (error) {
    console.error('Error fetching origin airports:', error);
    throw error;
  }
};

export const getDestinationAirports = async (origin: string): Promise<AirportCurrency[]> => {
  try {
    const response = await apiClient.get(`/airports/destinations?origin=${origin}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination airports:', error);
    throw error;
  }
};

// Calculation endpoint
export const calculateShouldCost = async (
  params: CalculationParams
): Promise<CalculationResult> => {
  try {
    const response = await apiClient.post('/calculate', params);
    return response.data;
  } catch (error) {
    console.error('Error calculating should-cost:', error);
    throw error;
  }
};

// System parameters endpoints
export const getSystemParameters = async (): Promise<SystemParameter[]> => {
  try {
    const response = await apiClient.get('/admin/parameters');
    return response.data;
  } catch (error) {
    console.error('Error fetching system parameters:', error);
    throw error;
  }
};

export const updateSystemParameters = async (
  params: SystemParameter[]
): Promise<SystemParameter[]> => {
  try {
    const response = await apiClient.put('/admin/parameters', { parameters: params });
    return response.data;
  } catch (error) {
    console.error('Error updating system parameters:', error);
    throw error;
  }
};

// Health check
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health');
    return response.status === 200;
  } catch {
    return false;
  }
};
// Add this new function
export const getCarrierBreakdown = async (
  origin: string,
  destination: string,
  isPreScreened: boolean,
  handlingModel: 'DAA' | 'FF'
): Promise<any[]> => {
  try {
    const response = await apiClient.get('/calculate/carriers', {
      params: {
        origin,
        destination,
        isPreScreened,
        handlingModel,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching carrier breakdown:', error);
    throw error;
  }
};

// Schedule routes endpoint
export const getRouteSchedule = async (
  origin: string,
  destination: string,
  month: number,
  year: number
): Promise<RouteData[]> => {
  try {
    console.log('Fetching route schedule:', { origin, destination, month, year });
    const response = await apiClient.get('/schedule/routes', {
      params: {
        origin,
        destination,
        month,
        year,
      },
    });
    console.log('Route schedule response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching route schedule:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      params: error.config?.params,
    });
    throw error;
  }
};

export default apiClient;