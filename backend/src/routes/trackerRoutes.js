import { Router } from 'express';
import { 
  getStudentApplications, 
  saveApplication, 
  deleteApplication 
} from '../controllers/trackerController.js';
import { authenticateStudent } from '../middleware/auth.js';
import { validateApplicationInput } from '../middleware/validator.js';

const router = Router();

router.use(authenticateStudent);

router.get('/', getStudentApplications);
router.post('/', validateApplicationInput, saveApplication);
router.put('/', validateApplicationInput, saveApplication);
router.delete('/:scholarshipId', deleteApplication);

export default router;
