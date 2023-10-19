import express from 'express';
import {
    checkHireRequests,
    createServiceProvider,
    getHireRequestById,
    getHireRequests,
    getMyHireRequests,
    getProviderById,
    getProviders,
    hireProvider,
    searchServiceProviders,
    updateHireRequest
} from '../controllers/servicesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getProviders);
router.route('/:id').get(getProviderById);

router
    .route('/hire')
    .post(protect, hireProvider)
    .put(protect, updateHireRequest);

router.route('/hire/:id').get(protect, getHireRequests);
router.route('/myhire/:id').get(protect, getMyHireRequests);
router.route('/hire/getbyid/:id').get(protect, getHireRequestById);
router.route('/hire/check').post(protect, checkHireRequests);
router.route('/create').post(protect, createServiceProvider);
router.route('/search/:searchTerm').get(protect, searchServiceProviders);

export default router;
