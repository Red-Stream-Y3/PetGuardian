import express from 'express';
//import { protect } from "../middleware/authMiddleware.js";
import {
  getAllAnimals,
  getDogs,
  getCats,
  getOtherAnimals,
  getAnimalByID,
  getAnimalsByUser
} from '../controllers/adoptionController.js';

const router = express.Router();

router.route('/').get(getAllAnimals);
//.post(createAdoption, protect);

router.route('/dogs').get(getDogs);
router.route('/cats').get(getCats);
router.route('/other').get(getOtherAnimals);

export default router;
