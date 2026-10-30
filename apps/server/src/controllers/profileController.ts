import { Request, Response } from 'express';
import * as profileService from '../services/profileService';
import { logger } from '../utils/logger';

export function getProfile(req: Request, res: Response) {
  const { username } = req.params;
  logger.info(`Fetching profile for username: ${username}`);
  
  const profile = profileService.getProfileByUsername(username);
  if (!profile) {
    logger.warn(`Profile not found for username: ${username}`);
    return res.status(404).json({ error: 'Profile not found' });
  }
  
  res.json(profile);
}

export function getOfferings(req: Request, res: Response) {
  const { username } = req.params;
  logger.info(`Fetching offerings for username: ${username}`);
  
  const offerings = profileService.getOfferingsByUsername(username);
  if (!offerings) {
    logger.warn(`Offerings not found for username: ${username}`);
    return res.status(404).json({ error: 'Offerings not found' });
  }
  
  res.json(offerings);
}

export function getRatings(req: Request, res: Response) {
  const { username } = req.params;
  logger.info(`Fetching ratings for username: ${username}`);
  
  const ratings = profileService.getRatingsByUsername(username);
  if (!ratings) {
    logger.warn(`Ratings not found for username: ${username}`);
    return res.status(404).json({ error: 'Ratings not found' });
  }
  
  res.json(ratings);
}

export function getCategories(req: Request, res: Response) {
  const { username } = req.params;
  logger.info(`Fetching categories for username: ${username}`);
  
  const categories = profileService.getCategoriesByUsername(username);
  if (!categories) {
    logger.warn(`Categories not found for username: ${username}`);
    return res.status(404).json({ error: 'Categories not found' });
  }
  
  res.json(categories);
}
