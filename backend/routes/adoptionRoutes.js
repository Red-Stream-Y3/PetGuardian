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
  getAvailablePets
} from '../controllers/adoptionController.js';

const router = express.Router();

router.route('/').get(getAvailablePets).post(postPetForAdoption);

router.route('/dogs').get(getDogs);
router.route('/cats').get(getCats);
router.route('/other').get(getOtherAnimals);
router.route('/:id').get(getPetID).put(updatePet);
router.route('/owner/:id').get(getPetByUser);
router.route('/request/:id').post(createAdoptionRequest);

export default router;
