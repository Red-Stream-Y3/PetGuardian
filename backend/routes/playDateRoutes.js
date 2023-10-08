import express from 'express';
import { createPlaydate, getPlaydateById, getPlaydates, getPlaydatesByUser, updatePlaydate, deletePlaydate } from "../controllers/playDateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(getPlaydates).post(createPlaydate, protect);
router.route('/:id').get(getPlaydateById).patch(updatePlaydate, protect).delete(deletePlaydate, protect);
router.route('/user/:id').get(getPlaydatesByUser, protect);

export default router;