import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';
import { uploadFile } from './StorageUtils.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      ...user._doc,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({
      error: 'Invalid email and password'
    });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, password, phone } = req.body;

  //validate password to include at least 1 number, 1 uppercase, 1 lowercase, and 1 special character
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400);
    throw new Error(
      'Password must be at least 8 characters and include at least 1 number, 1 uppercase, 1 lowercase, and 1 special character'
    );
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    firstName,
    lastName,
    email,
    password,
    phone
  });

  if (user) {
    res.status(201).json({
      ...user,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      profilePic: user.profilePic
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, password, phone } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    if (username) {
      user.username = req.body.username;
    }

    if (firstName) {
      user.firstName = req.body.firstName;
    }

    if (lastName) {
      user.lastName = req.body.lastName;
    }

    if (email) {
      user.email = req.body.email;
    }

    if (phone) {
      user.phone = req.body.phone;
    }

    if (password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (user) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Upload profile picture
// @route   POST /api/users/profilePic
// @access  Private
const uploadProfilePic = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const image = req.files.profile;

    if (!image[0]) {
      res.status(400);
      throw new Error('No file uploaded');
    }

    await uploadFile(image[0])
      .then((url) => {
        user.profilePic = url;
      })
      .catch((err) => {
        res.status(400);
        throw new Error(err);
      });

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      profilePic: user.profilePic,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  getUsers,
  uploadProfilePic
};
