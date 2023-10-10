import express from 'express';
import {
    checkHireRequests,
    getHireRequests,
    getMyHireRequests,
    getProviderById,
    getProviders,
    hireProvider,
} from "../controllers/servicesController.js";

const router = express.Router();

router.route('/').get(getProviders);
router.route('/:id').get(getProviderById);

router.route('/hire').post(hireProvider);

router.route('/hire/:id')
    .get(getHireRequests)
    //.put(hireProvider);

router.route('/myhire/:id')
    .get(getMyHireRequests);

router.route('/hire/check').post(checkHireRequests);

export default router;