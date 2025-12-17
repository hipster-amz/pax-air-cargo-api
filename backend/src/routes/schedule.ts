import { Router } from 'express';
import { getRouteSchedule, getAllRoutes, getRouteCorridors } from '../controllers/scheduleController';

const router = Router();

/**
 * GET /schedule/routes
 * Get route schedule for specific origin, destination, and optionally month/year
 * Query params: origin, destination, month (optional), year (optional)
 */
router.get('/routes', getRouteSchedule);

/**
 * GET /schedule/all
 * Get all routes in the system
 */
router.get('/all', getAllRoutes);

/**
 * GET /schedule/corridors
 * Get unique route pairs (corridors)
 */
router.get('/corridors', getRouteCorridors);

export default router;
