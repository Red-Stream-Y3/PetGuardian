import Adoption from '../models/adoptionModel.js';
import asyncHandler from 'express-async-handler';

// get all adoption animals
const getAllAnimals = async (req, res) => {
  try {
    const animals = await adoptionModel.find();
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get dogs only
const getDogs = async (req, res) => {
  try {
    const dogs = await adoptionModel.find({ species: 'dog' });
    res.status(200).json(dogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get cats only
const getCats = async (req, res) => {
  try {
    const cats = await adoptionModel.find({ species: 'cat' });
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get other animals
const getOtherAnimals = async (req, res) => {
  try {
    const otherAnimals = await adoptionModel.find({
      species: { $nin: ['dog', 'cat'] }
    });
    res.status(200).json(otherAnimals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get animal by ID
const getAnimalByID = async (req, res) => {
  try {
    const animal = await Adoption.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get animals by user
const getAnimalsByUser = async (req, res) => {
  try {
    const animals = await Adoption.find({ user: req.params.userId });
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getAllAnimals,
  getDogs,
  getCats,
  getOtherAnimals,
  getAnimalByID,
  getAnimalsByUser
};
