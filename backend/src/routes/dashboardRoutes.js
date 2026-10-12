import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboardController.js';
import { authenticateStudent } from '../middleware/auth.js';

const router = Router();

router.use(authenticateStudent);

router.get('/', getDashboardSummary);

export default router;
