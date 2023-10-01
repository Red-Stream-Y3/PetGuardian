import express from 'express';
import { getProviderById, getProviders } from '../controllers/servicesController.js';

const router = express.Router();

router.route('/').get(getProviders);
router.route('/:id').get(getProviderById);

export default router;