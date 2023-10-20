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
      currentOwner,
      vaccinated,
      healthStatus,
      healthDescriptiopn
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
      currentOwner,
      vaccinated,
      healthStatus,
      healthDescriptiopn
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
      status,
      vaccinated,
      healthStatus,
      healthDescriptiopn
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
    animal.vaccinated = vaccinated || animal.vaccinated;
    animal.healthStatus = healthStatus || animal.healthStatus;
    animal.healthDescriptiopn = healthDescriptiopn || animal.healthDescriptiopn;

    const updatedAnimal = await animal.save();
    res.status(200).json(updatedAnimal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete pet for adoption
const deletePetForAdoption = asyncHandler(async (req, res) => {
  try {
    const animal = await Adoption.findByIdAndDelete(req.params.id);
    if (animal) res.json({ message: 'Animal removed' });
    else {
      res.status(404);
      throw new Error('Animal not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//mark adoption request as approved
const approveAdoptionRequest = asyncHandler(async (req, res) => {
  try {
    const animal = await Adoption.findById(req.params.id);
    if (animal) {
      animal.status = 'approved';
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

// update adoption request

// delete adoption request

const uploadImagesToAdoption = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Adoption.findById(id);

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

    post.image = newImages;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Adoption not found');
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
  createAdoptionRequest,
  deletePetForAdoption,
  approveAdoptionRequest,
  uploadImagesToAdoption
};
