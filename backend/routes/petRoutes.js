import express from 'express';
import { getPetsByUser, getPetById, createPet, updatePet, deletePet } from '../controllers/petController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createPet);
router.route('/:id').get(getPetById).patch(updatePet).delete(deletePet);
router.route('/user/:id').get(getPetsByUser);

export default router;
