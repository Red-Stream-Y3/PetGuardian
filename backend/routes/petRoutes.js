import express from 'express';
import { getPetsByUser, getPetById, createPet, updatePet, deletePet } from '../controllers/petController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPetsByUser).post(createPet, protect);
router.route('/:id').get(getPetById).patch(updatePet, protect).delete(deletePet, protect);

export default router;
