import { Router } from 'express';
import profileRoutes from './profileRoutes.js';
import scholarshipRoutes from './scholarshipRoutes.js';
import matchingRoutes from './matchingRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import trackerRoutes from './trackerRoutes.js';
import calculatorRoutes from './calculatorRoutes.js';
import { checkSupabaseHealth } from '../config/supabase.js';

const router = Router();

// Health Check Endpoint
router.get('/health', async (req, res) => {
  const dbHealth = await checkSupabaseHealth();
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ScholarMatch AI Backend API',
    version: '1.0.0',
    database: dbHealth
  });
});

// Mount Resource Routes under /api/v1
router.use('/profile', profileRoutes);
router.use('/scholarships', scholarshipRoutes);
router.use('/matching', matchingRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/tracker', trackerRoutes);
router.use('/calculator', calculatorRoutes);

export default router;
