import { Request, Response, NextFunction } from 'express';
import * as profileService from '../services/profileService';
import { logger } from '../utils/logger';

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;
    logger.info(`Fetching profile for username: ${username}`);

    const profile = await profileService.getProfileByUsername(username);
    if (!profile) {
      logger.warn(`Profile not found for username: ${username}`);
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function getOfferings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;
    logger.info(`Fetching offerings for username: ${username}`);

    const offerings = await profileService.getOfferingsByUsername(username);
    if (!offerings) {
      logger.warn(`Offerings not found for username: ${username}`);
      return res.status(404).json({ error: 'Offerings not found' });
    }

    res.json(offerings);
  } catch (err) {
    next(err);
  }
}

export async function getRatings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;
    logger.info(`Fetching ratings for username: ${username}`);

    const ratings = await profileService.getRatingsByUsername(username);
    if (!ratings) {
      logger.warn(`Ratings not found for username: ${username}`);
      return res.status(404).json({ error: 'Ratings not found' });
    }

    res.json(ratings);
  } catch (err) {
    next(err);
  }
}

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;
    logger.info(`Fetching categories for username: ${username}`);

    const categories = await profileService.getCategoriesByUsername(username);
    if (!categories) {
      logger.warn(`Categories not found for username: ${username}`);
      return res.status(404).json({ error: 'Categories not found' });
    }

    res.json(categories);
  } catch (err) {
    next(err);
  }
}
