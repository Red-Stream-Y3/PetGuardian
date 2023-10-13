import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  requestRole,
  getAuthorInfoById,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(registerUser).get(getUsers);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);
router.route('/:id/request').put(requestRole);
router.route('/:id/author').get(getAuthorInfoById);

export default router;
