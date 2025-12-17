import { Request, Response } from 'express';
import { calculateShouldCost as calculateShouldCostService } from '../services/calculationService';
import { calculateCarrierBreakdown } from '../services/carrierCalculationService';

export const calculateShouldCost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { originCode, destinationCode, isPreScreened, handlingModel } = req.body;

    if (!originCode || !destinationCode) {
      res.status(400).json({ error: 'Origin and destination codes are required' });
      return;
    }

    if (!['DAA', 'FF'].includes(handlingModel)) {
      res.status(400).json({ error: 'Handling model must be either DAA or FF' });
      return;
    }

    const result = await calculateShouldCostService(
      originCode,
      destinationCode,
      isPreScreened,
      handlingModel
    );

    res.status(200).json(result);
  } catch (error: any) {
    console.error('Error calculating should-cost:', error);
    res.status(500).json({ error: error.message || 'Failed to calculate should-cost' });
  }
};

export const getCarrierBreakdown = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin, destination, isPreScreened, handlingModel } = req.query;

    if (!origin || !destination) {
      res.status(400).json({ error: 'Origin and destination codes are required' });
      return;
    }

    const carriers = await calculateCarrierBreakdown(
      origin as string,
      destination as string,
      isPreScreened === 'true',
      (handlingModel as 'DAA' | 'FF') || 'DAA'
    );

    res.status(200).json(carriers);
  } catch (error: any) {
    console.error('Error fetching carrier breakdown:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch carrier breakdown' });
  }
};