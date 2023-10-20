import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  uploadProfilePic
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import multermiddleware from '../middleware/Multer.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/profilePic')
  .post(
    protect,
    multermiddleware.fields([{ name: 'profile', maxCount: 1 }]),
    uploadProfilePic
  );
router.route('/:id').delete(protect, deleteUser).get(protect, getUserById);

export default router;
