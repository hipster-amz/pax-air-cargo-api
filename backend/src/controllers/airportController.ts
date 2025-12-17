import { Request, Response } from 'express';
import { AirportCurrency, RouteData } from '../models';
import { Op } from 'sequelize';

// Get all origin airports
export const getOriginAirports = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get unique origin airport codes from route_data
    const originCodes = await RouteData.findAll({
      attributes: ['codeDep'],
      group: ['codeDep'],
      raw: true,
    });

    const codes = originCodes.map((item: any) => item.codeDep);

    // Get airport details
    const airports = await AirportCurrency.findAll({
      where: {
        iataCode: {
          [Op.in]: codes,
        },
      },
      order: [['iataCode', 'ASC']],
    });

    res.status(200).json(airports);
  } catch (error) {
    console.error('Error fetching origin airports:', error);
    res.status(500).json({ error: 'Failed to fetch origin airports' });
  }
};

// Get destination airports for a given origin
export const getDestinationAirports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin } = req.query;

    if (!origin) {
      res.status(400).json({ error: 'Origin parameter is required' });
      return;
    }

    // Get unique destination codes for the selected origin
    const destCodes = await RouteData.findAll({
      attributes: ['codeArr'],
      where: {
        codeDep: origin.toString(),
      },
      group: ['codeArr'],
      raw: true,
    });

    const codes = destCodes.map((item: any) => item.codeArr);

    // Get destination airport details
    const airports = await AirportCurrency.findAll({
      where: {
        iataCode: {
          [Op.in]: codes,
        },
      },
      order: [['iataCode', 'ASC']],
    });

    res.status(200).json(airports);
  } catch (error) {
    console.error('Error fetching destination airports:', error);
    res.status(500).json({ error: 'Failed to fetch destination airports' });
  }
};