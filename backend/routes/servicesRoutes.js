import express from 'express';
import {
    checkHireRequests,
    getHireRequestById,
    getHireRequests,
    getMyHireRequests,
    getProviderById,
    getProviders,
    hireProvider,
    updateHireRequest,
} from '../controllers/servicesController.js';

const router = express.Router();

router.route('/').get(getProviders);
router.route('/:id').get(getProviderById);

router.route('/hire').post(hireProvider).put(updateHireRequest);

router.route('/hire/:id').get(getHireRequests);

router.route('/myhire/:id').get(getMyHireRequests);

router.route('/hire/getbyid/:id').get(getHireRequestById);

router.route('/hire/check').post(checkHireRequests);

export default router;
