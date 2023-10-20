import express from 'express';
//import { protect } from "../middleware/authMiddleware.js";
import {
  getDogs,
  getCats,
  getOtherAnimals,
  getPetID,
  getPetByUser,
  postPetForAdoption,
  updatePet,
  createAdoptionRequest,
  getAvailablePets,
  deletePetForAdoption,
  approveAdoptionRequest,
  uploadImagesToAdoption
} from '../controllers/adoptionController.js';
import { protect } from '../middleware/authMiddleware.js';
import multermiddleware from './../middleware/Multer.js';

const router = express.Router();

router.route('/').get(getAvailablePets).post(postPetForAdoption);

router.route('/dogs').get(getDogs);
router.route('/cats').get(getCats);
router.route('/other').get(getOtherAnimals);
router.route('/:id').get(getPetID).put(updatePet).delete(deletePetForAdoption);
router.route('/owner/:id').get(getPetByUser);
router.route('/request/:id').post(createAdoptionRequest);
router.route('/approve/:id').put(approveAdoptionRequest);
router
  .route('/upload/:id')
  .post(
    protect,
    multermiddleware.fields([{ name: 'images', maxCount: 1 }]),
    uploadImagesToAdoption
  );

export default router;
