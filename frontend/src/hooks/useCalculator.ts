import { useState, useEffect } from 'react';
import { AirportCurrency, CalculationResult } from '../types';
import {
  getOriginAirports,
  getDestinationAirports,
  calculateShouldCost,
} from '../services/api';

interface UseCalculatorReturn {
  originAirports: AirportCurrency[];
  destinationAirports: AirportCurrency[];
  loading: boolean;
  error: string | null;
  result: CalculationResult | null;
  handleOriginChange: (origin: string) => void;
  handleCalculate: (
    origin: string,
    destination: string,
    isPreScreened: boolean,
    handlingModel: 'DAA' | 'FF'
  ) => Promise<void>;
}

export const useCalculator = (): UseCalculatorReturn => {
  const [originAirports, setOriginAirports] = useState<AirportCurrency[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<AirportCurrency[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Load origin airports on mount
  useEffect(() => {
    const loadOriginAirports = async () => {
      try {
        setLoading(true);
        setError(null);
        const airports = await getOriginAirports();
        setOriginAirports(airports);
      } catch (err) {
        setError('Failed to load origin airports');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOriginAirports();
  }, []);

  // Handle origin change
  const handleOriginChange = async (origin: string) => {
    if (!origin) {
      setDestinationAirports([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const airports = await getDestinationAirports(origin);
      setDestinationAirports(airports);
    } catch (err) {
      setError('Failed to load destination airports');
      console.error(err);
      setDestinationAirports([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle calculate
  const handleCalculate = async (
    origin: string,
    destination: string,
    isPreScreened: boolean,
    handlingModel: 'DAA' | 'FF'
  ) => {
    try {
      setLoading(true);
      setError(null);
      const calculationResult = await calculateShouldCost({
        originCode: origin,
        destinationCode: destination,
        isPreScreened,
        handlingModel,
      });
      setResult(calculationResult);
    } catch (err) {
      setError('Failed to calculate should-cost');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    originAirports,
    destinationAirports,
    loading,
    error,
    result,
    handleOriginChange,
    handleCalculate,
  };
};