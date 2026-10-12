import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { checkSupabaseHealth } from './config/supabase.js';

const app = express();

// 1. Security & Logging Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  env.frontendUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || env.nodeEnv === 'development') {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy does not allow access from ${origin}`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-student-id']
}));

if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Root API Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ScholarMatch AI - Scholarship & Financial Aid API',
    version: '1.0.0',
    documentation: '/api/v1/health',
    endpoints: {
      health: 'GET /api/v1/health',
      profile: 'GET, POST /api/v1/profile',
      scholarships: 'GET /api/v1/scholarships',
      matching: 'GET, POST /api/v1/matching',
      dashboard: 'GET /api/v1/dashboard',
      tracker: 'GET, POST, DELETE /api/v1/tracker',
      calculator: 'POST /api/v1/calculator/gap-analysis'
    }
  });
});

// 3. Mount API v1 Routes
app.use('/api/v1', apiRoutes);

// 4. 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// 5. Centralized Error Handler
app.use(errorHandler);

// 6. Start Server
const server = app.listen(env.port, async () => {
  console.log(`\n======================================================`);
  console.log(`🚀 ScholarMatch AI Backend Server running on port ${env.port}`);
  console.log(`📡 URL: http://localhost:${env.port}`);
  console.log(`🌍 Environment: ${env.nodeEnv}`);
  console.log(`🔑 Auth Mode: ${env.authMode}`);
  
  const health = await checkSupabaseHealth();
  console.log(`🗄️ Database: ${health.message} (${health.mode})`);
  console.log(`======================================================\n`);
});

export default app;
