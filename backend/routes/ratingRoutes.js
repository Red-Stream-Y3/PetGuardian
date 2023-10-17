import express from 'express';
import {
    createRating,
    getRatingById,
    getRatingByServiceProvider,
    getRatingByUserAndServiceProvider,
    updateRatingByUserAndServiceProvider,
} from '../controllers/ratingController.js';

const router = express.Router();

router.route('/').get(getRatingById).post(createRating);

router.route('/:id').get(getRatingByServiceProvider);

// POST a new rating
router.route('/user/:uid/:sid').get(getRatingByUserAndServiceProvider).put(updateRatingByUserAndServiceProvider);

export default router;
