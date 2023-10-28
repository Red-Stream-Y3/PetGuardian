import express from 'express';
import {
  createPlaydate,
  getPlaydateById,
  getPlaydates,
  getPlaydatesByUser,
  updatePlaydate,
  deletePlaydate,
  createRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
  getPlaydateByIdFullDetails,
  approveRequest,
  rejectRequest,
  searchPlaydates
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
  .get(getRequestById)
  .patch(updateRequest)
  .delete(deleteRequest);
router.route('/:id/fullRequest/:requestId').get(getPlaydateByIdFullDetails);
router.route('/:id/request/:requestId/approve').patch(approveRequest);
router.route('/:id/request/:requestId/reject').patch(rejectRequest);
router.route('/search/:searchTerm').get(searchPlaydates);

export default router;
