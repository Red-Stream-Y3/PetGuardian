import express from 'express';
import {
  getPosts,
  getPostsByUser,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts, protect).post(createPost, protect);
router.route('/user/:id').get(getPostsByUser, protect);
router
  .route('/:id')
  .get(getPostById, protect)
  .put(updatePost, protect)
  .delete(deletePost, protect);

export default router;
