import { Router } from 'express';
import { getOriginAirports, getDestinationAirports } from '../controllers/airportController';

const router = Router();

router.get('/origins', getOriginAirports);
router.get('/destinations', getDestinationAirports);

export default router;