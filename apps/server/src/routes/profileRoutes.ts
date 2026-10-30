import { Router } from 'express';
import * as profileController from '../controllers/profileController';

const router = Router();

router.get('/:username', profileController.getProfile);
router.get('/:username/offerings', profileController.getOfferings);
router.get('/:username/ratings', profileController.getRatings);
router.get('/:username/categories', profileController.getCategories);

export default router;
