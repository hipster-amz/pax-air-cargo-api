import { Router } from 'express';
import { calculateShouldCost, getCarrierBreakdown } from '../controllers/calculationController';

const router = Router();

router.post('/', calculateShouldCost);
router.get('/carriers', getCarrierBreakdown);

export default router;