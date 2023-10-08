import Pet from "../models/petModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all pets by user
// @route   GET /api/pets
// @access  Public

const getPetsByUser = asyncHandler(async (req, res) => {
    try{
        const pets = await Pet.find({user: req.params.id});
        res.json(pets);
    }
    catch(error){
        res.status(404);
        throw new Error('Pets not found');
    }
});

// @desc    Fetch single pet by id
// @route   GET /api/pets/:id
// @access  Public

const getPetById = asyncHandler(async (req, res) => {
    try{
        const pet = await Pet.findById(req.params.id);
        res.json(pet);
    }
    catch(error){
        res.status(404);
        throw new Error('Pet not found');
    }
});

// @desc    Create a pet
// @route   POST /api/pets
// @access  Private

const createPet = asyncHandler(async (req, res) => {
    const {name, type, breed, age, weight, description, image} = req.body;
    try{
        const pet = await Pet.create({
            name,
            type,
            breed,
            age,
            weight,
            description,
            image,
            user: req.user._id,
        });
        res.status(201).json(pet);
    }
    catch(error){
        res.status(400);
        throw new Error('Invalid pet data');
    }
});

// @desc    Update a pet
// @route   PATCH /api/pets/:id
// @access  Private

const updatePet = asyncHandler(async (req, res) => {
    const {name, type, breed, age, weight, description, image} = req.body;
    try{
        const pet = await Pet.findById(req.params.id);
        if(pet){
            pet.name = name || pet.name;
            pet.type = type || pet.type;
            pet.breed = breed || pet.breed;
            pet.age = age || pet.age;
            pet.weight = weight || pet.weight;
            pet.description = description || pet.description;
            pet.image = image || pet.image;
            const updatedPet = await pet.save();
            res.json(updatedPet);
        }
        else{
            res.status(404);
            throw new Error('Pet not found');
        }
    }
    catch(error){
        res.status(400);
        throw new Error('Invalid pet data');
    }
});

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
// @access  Private

const deletePet = asyncHandler(async (req, res) => {
    try{
        const pet = await Pet.findById(req.params.id);
        if(pet){
            await pet.remove();
            res.json({message: 'Pet removed'});
        }
        else{
            res.status(404);
            throw new Error('Pet not found');
        }
    }
    catch(error){
        res.status(404);
        throw new Error('Pet not found');
    }
});

export {
    getPetsByUser,
    getPetById,
    createPet,
    updatePet,
    deletePet,
};