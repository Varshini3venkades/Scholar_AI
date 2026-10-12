import { Router } from 'express';
import { getAllScholarships, getScholarshipById } from '../controllers/scholarshipController.js';
import { validateScholarshipQuery } from '../middleware/validator.js';

const router = Router();

router.get('/', validateScholarshipQuery, getAllScholarships);
router.get('/:id', getScholarshipById);

export default router;
