import Adoption from '../models/adoptionModel.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { sendNotification } from '../utils/notificationUtils.js';

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
    const animal = await Adoption.findById(req.params.id).populate({
      path: 'currentOwner',
      select: 'username phone'
    });
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
      healthDescription
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
      healthDescription
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

// create adoption request
const createAdoptionRequest = asyncHandler(async (req, res) => {
  const { pet, requester, experiencedPetOwner, houseHoldType } = req.body;
  try {
    const animal = await Adoption.findById(req.params.id);

    if (animal) {
      const adoptionRequest = {
        pet,
        requester,
        experiencedPetOwner,
        houseHoldType
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
const deleteAdoptionRequest = asyncHandler(async (req, res) => {
  try {
    const requestId = req.params.id;

    const adoption = await Adoption.findOne({
      'adoptionRequests._id': requestId
    });
    if (!adoption) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    const request = adoption.adoptionRequests.find(
      (request) => request._id.toString() === requestId
    );
    if (!request) {
      return res.status(404).json({ message: 'Adoption request not found' });
    }
    //console.log(adoption);
    adoption.adoptionRequests = adoption.adoptionRequests.filter(
      (request) => request._id.toString() !== requestId
    );
    await adoption.save();
    res.status(200).json({ message: 'Adoption request deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//mark adoption request as approved
// const approveAdoptionRequest = asyncHandler(async (req, res) => {
//   try {
//     const requestId = req.params.id;

//     const adoption = await Adoption.findOne({
//       'adoptionRequests._id': requestId
//     });
//     if (!adoption) {
//       return res.status(404).json({ message: 'Pet not found' });
//     }
//     const request = adoption.adoptionRequests.find(
//       (request) => request._id.toString() === requestId
//     );
//     if (!request) {
//       return res.status(404).json({ message: 'Adoption request not found' });
//     }
//     //console.log(adoption);
//     adoption.status = 'adopted';
//     request.status = 'approved';
//     await adoption.save();
//     res.status(200).json({ message: 'Adoption request approved' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

const approveAdoptionRequest = asyncHandler(async (req, res) => {
  try {
    const requestId = req.params.id;

    const adoption = await Adoption.findOne({
      'adoptionRequests._id': requestId
    }).populate('adoptionRequests.requester', '_id');

    if (!adoption) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const request = adoption.adoptionRequests.find(
      (request) => request._id.toString() === requestId
    );

    if (!request) {
      return res.status(404).json({ message: 'Adoption request not found' });
    }

    const requesterId = request.requester._id;

    adoption.status = 'adopted';
    request.status = 'approved';
    await adoption.save();

    // send notification to requester
    await sendNotification(
      requesterId,
      'Adoption Request Approved',
      'Your adoption request has been approved.'
    );

    res.status(200).json({ message: 'Adoption request approved', requesterId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//mark adoption request as rejected
const rejectAdoptionRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    const adoption = await Adoption.findOne({
      'adoptionRequests._id': requestId
    }).populate('adoptionRequests.requester', '_id');

    if (!adoption) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const request = adoption.adoptionRequests.find(
      (request) => request._id.toString() === requestId
    );

    if (!request) {
      return res.status(404).json({ message: 'Adoption request not found' });
    }

    const requesterId = request.requester._id;

    adoption.status = 'pending';
    request.status = 'rejected';
    await adoption.save();

    // send notification to requester
    await sendNotification(
      requesterId,
      'Adoption Request Rejected',
      'Your adoption request has been rejected.'
    );

    res.status(200).json({ message: 'Adoption request rejected', requesterId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//get requesters for a pet
const getRequesters = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const animal = await Adoption.findById(id).populate({
    path: 'adoptionRequests',
    populate: {
      path: 'requester',
      select: 'firstName lastName username phone profilePic'
    }
  });
  if (animal) {
    res.status(200).json(animal.adoptionRequests);
  } else {
    res.status(404);
    throw new Error('Animal not found');
  }
});

const getAdoptionRequestsByUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const adoptionRequests = await Adoption.find({
    'adoptionRequests.requester': userId
  }).select(
    'name status image currentOwner gender age breed adoptionRequests.$'
  );
  res.status(200).json(adoptionRequests);
});

//upload Images to adoption
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
            newImages.push(uri);
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
  rejectAdoptionRequest,
  getRequesters,
  uploadImagesToAdoption,
  deleteAdoptionRequest,
  getAdoptionRequestsByUser
};
