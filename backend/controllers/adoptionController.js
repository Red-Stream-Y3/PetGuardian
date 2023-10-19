import Adoption from '../models/adoptionModel.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// get all adoption animals
const getAllAnimals = async (req, res) => {
  try {
    const animals = await Adoption.find();
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all available animals
const getAvailablePets = async (req, res) => {
  try {
    const animals = await Adoption.find({ status: 'pending' });
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get dogs only
const getDogs = async (req, res) => {
  try {
    const dogs = await Adoption.find({ species: 'dog', status: 'pending' });
    res.status(200).json(dogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get cats only
const getCats = async (req, res) => {
  try {
    const cats = await Adoption.find({ species: 'cat', status: 'pending' });
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get other animals
const getOtherAnimals = async (req, res) => {
  try {
    const otherAnimals = await Adoption.find({
      species: { $nin: ['dog', 'cat'] },
      status: 'pending'
    });
    res.status(200).json(otherAnimals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get animal by ID
const getPetID = async (req, res) => {
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
const getPetByUser = async (req, res) => {
  try {
    const animals = await Adoption.find({ currentOwner: req.params.id });

    if (!animals || animals.length === 0) {
      return res
        .status(404)
        .json({ message: 'No animals found for the specified user.' });
    }

    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create a new pet for adoption
const postPetForAdoption = async (req, res) => {
  try {
    const {
      name,
      species,
      breed,
      age,
      gender,
      description,
      location,
      image,
      currentOwner
    } = req.body;
    const pet = await Adoption.create({
      name,
      species,
      breed,
      age,
      gender,
      description,
      image,
      location,
      currentOwner
    });
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update animal details
const updatePet = async (req, res) => {
  try {
    const {
      name,
      species,
      breed,
      age,
      gender,
      description,
      location,
      image,
      currentOwner,
      status
    } = req.body;
    const animal = await Adoption.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    animal.name = name || animal.name;
    animal.species = species || animal.species;
    animal.breed = breed || animal.breed;
    animal.age = age || animal.age;
    animal.gender = gender || animal.gender;
    animal.description = description || animal.description;
    animal.location = location || animal.location;
    animal.image = image || animal.image;
    animal.status = status || animal.status;
    animal.currentOwner = currentOwner || animal.currentOwner;

    const updatedAnimal = await animal.save();
    res.status(200).json(updatedAnimal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create adoption request
const createAdoptionRequest = asyncHandler(async (req, res) => {
  //const status = 'pending';
  const { pet, requester, status } = req.body;
  try {
    const animal = await Adoption.findById(req.params.id);

    if (animal) {
      const adoptionRequest = {
        pet,
        requester,
        status
      };
      animal.adoptionRequests.push(adoptionRequest);
      const updatedAnimal = await animal.save();
      res.status(201).json(updatedAnimal);
    } else {
      res.status(404);
      throw new Error('Animal not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Invalid request data');
  }
});

export {
  getAvailablePets,
  getDogs,
  getCats,
  getOtherAnimals,
  getPetID,
  getPetByUser,
  postPetForAdoption,
  updatePet,
  createAdoptionRequest
};
