import express from 'express';
import { createRating, getRatingById, getRatingByServiceProvider, getRatingByUserAndServiceProvider, updateRatingByUserAndServiceProvider } from '../controllers/ratingController';

const router = express.Router();

router.get('/')
    .get(getRatingById)
    .post(createRating);

router.get('/:id').get(getRatingByServiceProvider)

// POST a new rating
router.post('/user/:uid/:sid')
    .get(getRatingByUserAndServiceProvider)
    .put(updateRatingByUserAndServiceProvider);

module.exports = router;
