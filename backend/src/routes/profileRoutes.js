import { Router } from 'express';
import { getProfile, saveProfile } from '../controllers/profileController.js';
import { authenticateStudent } from '../middleware/auth.js';
import { validateProfileInput } from '../middleware/validator.js';

const router = Router();

router.use(authenticateStudent);

router.get('/', getProfile);
router.post('/', validateProfileInput, saveProfile);
router.put('/', validateProfileInput, saveProfile);

export default router;
