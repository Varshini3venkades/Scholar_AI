import { env } from '../config/env.js';

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
    ...(env.nodeEnv === 'development' ? { stack: err.stack } : {})
  });
}
