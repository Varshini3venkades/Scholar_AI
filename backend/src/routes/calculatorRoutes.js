import { Router } from 'express';
import { calculateAidGap } from '../controllers/calculatorController.js';
import { authenticateStudent } from '../middleware/auth.js';
import { validateCalculatorInput } from '../middleware/validator.js';

const router = Router();

router.use(authenticateStudent);

router.post('/gap-analysis', validateCalculatorInput, calculateAidGap);

export default router;
