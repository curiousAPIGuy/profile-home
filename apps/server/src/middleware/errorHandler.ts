import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(`Error processing request: ${err.message}`, err);
  res.status(500).json({ error: 'Internal server error' });
}
