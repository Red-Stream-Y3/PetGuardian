import express from 'express';
import {
  createPlaydate,
  getPlaydateById,
  getPlaydates,
  getPlaydatesByUser,
  updatePlaydate,
  deletePlaydate,
  createRequest,
  updateRequest,
  deleteRequest
} from '../controllers/playDateController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPlaydates).post(createPlaydate);
router
  .route('/:id')
  .get(getPlaydateById)
  .patch(updatePlaydate)
  .delete(deletePlaydate);
router.route('/user/:id').get(getPlaydatesByUser);
router.route('/:id/request').post(createRequest);
router
  .route('/:id/request/:requestId')
  .patch(updateRequest)
  .delete(deleteRequest);

export default router;
