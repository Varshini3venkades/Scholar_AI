import { Router } from 'express';
import { getStudentMatches } from '../controllers/matchingController.js';
import { authenticateStudent } from '../middleware/auth.js';

const router = Router();

router.use(authenticateStudent);

router.get('/', getStudentMatches);
router.post('/', getStudentMatches);

export default router;
