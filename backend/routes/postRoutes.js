import express from 'express';
import {
  getPosts,
  getPostsByUser,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';

const router = express.Router();

router.route('/').get(getPosts).post(createPost);
router.route('/user/:id').get(getPostsByUser);
router.route('/:id').get(getPostById).patch(updatePost).delete(deletePost);

export default router;
