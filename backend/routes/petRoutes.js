import express from 'express';
import {
  getPetsByUser,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  uploadPetImage
} from '../controllers/petController.js';
import { protect } from '../middleware/authMiddleware.js';
import multermiddleware from './../middleware/Multer.js';

const router = express.Router();

router.route('/').post(createPet);
router.route('/:id').get(getPetById).patch(updatePet).delete(deletePet);
router.route('/user/:id').get(getPetsByUser);
router
  .route('/upload/:id')
  .post(
    protect,
    multermiddleware.fields([{ name: 'images', maxCount: 10 }]),
    uploadPetImage
  );

export default router;
