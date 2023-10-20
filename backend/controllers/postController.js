import Post from '../models/postModel.js';
import asyncHandler from 'express-async-handler';
import { uploadFile } from '../utils/StorageUtils.js';

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().populate('user pet');
    res.json(posts);
  } catch (error) {
    res.status(404);
    throw new Error('Posts not found');
  }
});

// @desc    Fetch all posts by user
// @route   GET /api/posts/user/:id
// @access  Public

const getPostsByUser = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).populate('user pet');
    res.json(posts);
  } catch (error) {
    res.status(404);
    throw new Error('Posts not found');
  }
});

// @desc    Fetch single post by id
// @route   GET /api/posts/:id
// @access  Public

const getPostById = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user pet');
    res.json(post);
  } catch (error) {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private

const createPost = asyncHandler(async (req, res) => {
  const { user, pet, type, content, images, date, location } = req.body;
  try {
    const post = await Post.create({
      user,
      pet,
      type,
      content,
      images,
      date,
      location
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid post data');
  }
});

// @desc    Update a post
// @route   PATCH /api/posts/:id
// @access  Private

const updatePost = asyncHandler(async (req, res) => {
  const { user, pet, type, content, images, date, location } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.user = user;
      post.pet = pet;
      post.type = type;
      post.content = content;
      post.images = images;
      post.date = date;
      post.location = location;
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid post data');
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private

const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.remove();
      res.json({ message: 'Post removed' });
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  } catch (error) {
    res.status(404);
    throw new Error('Post not found');
  }
});

const uploadImagesToPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (post) {
    let newImages = [];

    if (req.files?.images?.length > 0) {
      //upload images to cloud storage
      const images = req.files.images;

      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        await uploadFile(file)
          .then((uri) => {
            const publicUrl = `https://storage.googleapis.com/${
              String(url).split('gs://')[1]
            }`;
            newImages.push(publicUrl);
          })
          .catch((err) => {
            res.status(400);
            throw new Error(err);
          });
      }
    } else {
      res.status(400);
      throw new Error('No file uploaded');
    }

    post.images = newImages;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

export {
  getPosts,
  getPostsByUser,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  uploadImagesToPost
};
