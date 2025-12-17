import { Request, Response } from 'express';
import { RouteData } from '../models';
import { Op } from 'sequelize';

/**
 * Get route schedule for a given origin, destination, month, and year
 * This endpoint filters RouteData by origin/destination and optionally by time period
 */
export const getRouteSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin, destination, month, year } = req.query;

    // Validate required parameters
    if (!origin || !destination) {
      res.status(400).json({ error: 'Origin and destination parameters are required' });
      return;
    }

    // Build the where clause
    const where: any = {
      codeDep: origin.toString(),
      codeArr: destination.toString(),
    };

    // If month and year are provided, filter accordingly
    // Note: RouteData may not have date fields, so this is for future extensibility
    // For now, we'll just return all routes for the origin-destination pair

    // Fetch routes
    const routes = await RouteData.findAll({
      where,
      order: [
        ['carrierCode', 'ASC'],
        ['equip', 'ASC'],
      ],
    });

    if (routes.length === 0) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(routes);
  } catch (error) {
    console.error('Error fetching route schedule:', error);
    res.status(500).json({ error: 'Failed to fetch route schedule data' });
  }
};

/**
 * Get all available routes grouped by corridor
 */
export const getAllRoutes = async (req: Request, res: Response): Promise<void> => {
  try {
    const routes = await RouteData.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [
        ['codeDep', 'ASC'],
        ['codeArr', 'ASC'],
        ['carrierCode', 'ASC'],
      ],
    });

    res.status(200).json(routes);
  } catch (error) {
    console.error('Error fetching all routes:', error);
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
};

/**
 * Get unique route pairs (corridors)
 */
export const getRouteCorridors = async (req: Request, res: Response): Promise<void> => {
  try {
    const routes = await RouteData.findAll({
      attributes: [
        ['codeDep', 'origin'],
        ['codeArr', 'destination'],
      ],
      raw: true,
      subQuery: false,
      group: ['codeDep', 'codeArr'],
      order: [
        ['codeDep', 'ASC'],
        ['codeArr', 'ASC'],
      ],
    });

    res.status(200).json(routes);
  } catch (error) {
    console.error('Error fetching route corridors:', error);
    res.status(500).json({ error: 'Failed to fetch route corridors' });
  }
};
