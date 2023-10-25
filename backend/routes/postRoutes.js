import express from 'express';
import {
  getPosts,
  getPostsByUser,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  uploadImagesToPost,
  searchPosts
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import multermiddleware from './../middleware/Multer.js';

const router = express.Router();

router.route('/').get(getPosts, protect).post(createPost, protect);
router.route('/search/:searchTerm').get(searchPosts);
router.route('/user/:id').get(getPostsByUser, protect);
router
  .route('/:id')
  .get(getPostById, protect)
  .put(updatePost, protect)
  .delete(deletePost, protect);
router
  .route('/upload/:id')
  .post(
    protect,
    multermiddleware.fields([{ name: 'images', maxCount: 10 }]),
    uploadImagesToPost
  );

export default router;
