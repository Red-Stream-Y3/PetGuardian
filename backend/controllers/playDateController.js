import Playdate from '../models/playdateModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all playdates
// @route   GET /api/playdates
// @access  Public

const getPlaydates = asyncHandler(async (req, res) => {
    try{
        const playdates = await Playdate.find({});
        res.json(playdates);
    }
    catch(error){
        res.status(404);
        throw new Error('Playdates not found');
    }
});

// @desc    Fetch single playdate by id
// @route   GET /api/playdates/:id
// @access  Public

const getPlaydateById = asyncHandler(async (req, res) => {
    try{
        const playdate = await Playdate.findById(req.params.id);
        res.json(playdate);
    }
    catch(error){
        res.status(404);
        throw new Error('Playdate not found');
    }
});

// @desc    Fetch all playdates by user
// @route   GET /api/playdates/user/:id
// @access  Private

const getPlaydatesByUser = asyncHandler(async (req, res) => {
    try{
        const playdates = await Playdate.find({user: req.params.id});
        res.json(playdates);
    }
    catch(error){
        res.status(404);
        throw new Error('Playdates not found');
    }
});

// @desc    Create a playdate
// @route   POST /api/playdates
// @access  Private

const createPlaydate = asyncHandler(async (req, res) => {
    const {date, time, location, description, pets, user} = req.body;
    try{
        const playdate = await Playdate.create({
            date,
            time,
            location,
            description,
            pets,
            user
        });
        res.status(201).json(playdate);
    }
    catch(error){
        res.status(400);
        throw new Error('Invalid playdate data');
    }
});

// @desc    Update a playdate
// @route   PATCH /api/playdates/:id
// @access  Private

const updatePlaydate = asyncHandler(async (req, res) => {
    const {date, time, location, description, pets} = req.body;
    try{
        const playdate = await Playdate.findById(req.params.id);
        if(playdate){
            playdate.date = date || playdate.date;
            playdate.time = time || playdate.time;
            playdate.location = location || playdate.location;
            playdate.description = description || playdate.description;
            playdate.pets = pets || playdate.pets;
            const updatedPlaydate = await playdate.save();
            res.json(updatedPlaydate);
        }
        else{
            res.status(404);
            throw new Error('Playdate not found');
        }
    }
    catch(error){
        res.status(400);
        throw new Error('Invalid playdate data');
    }
});

// @desc    Delete a playdate
// @route   DELETE /api/playdates/:id
// @access  Private

const deletePlaydate = asyncHandler(async (req, res) => {
    try{
        const playdate = await Playdate.findByIdAndDelete(req.params.id);
        if(playdate)
            res.json({ message: 'Playdate removed' });
        else{
            res.status(404);
            throw new Error('Playdate not found');
        }
    }
    catch(error){
        res.status(400);
        throw new Error(error);
    }
});

//@desc     Create a request
//@route    POST /api/playdates/:id/request
//@access   Private

const createRequest = asyncHandler(async (req, res) => {
    const {user, pets, status, description, contactNo} = req.body;
    try{
        const playdate = await Playdate.findById(req.params.id);
        if(playdate){
            const request = {
                user,
                pets,
                status,
                description,
                contactNo,
            };
            playdate.requests.push(request);
            const updatedPlaydate = await playdate.save();
            res.status(201).json(updatedPlaydate);
        }
        else{
            res.status(404);
            throw new Error('Playdate not found');
        }
    }
    catch(error){
        res.status(400);
        throw new Error('Invalid request data');
    }
});

//@desc     Update a request
//@route    PATCH /api/playdates/:id/request/:requestId
//@access   Private

const updateRequest = asyncHandler(async (req, res) => {
    const {user, pets, status, description, contactNo} = req.body;
    try{
        const playdate = await Playdate.findById(req.params.id);
        if(playdate){
            const request = playdate.requests.find(request => request._id == req.params.requestId);
            if(request){
                request.user = user || request.user;
                request.pets = pets || request.pets;
                request.status = status || request.status;
                request.description = description || request.description;
                request.contactNo = contactNo || request.contactNo;
                const updatedPlaydate = await playdate.save();
                res.json(updatedPlaydate);
            }
            else{
                res.status(404);
                throw new Error('Request not found');
            }
        }
        else{
            res.status(404);
            throw new Error('Playdate not found');
        }
    }
    catch(error){
        res.status(400);
        throw new Error('Invalid request data');
    }
});

//@desc     Delete a request
//@route    DELETE /api/playdates/:id/request/:requestId
//@access   Private

const deleteRequest = asyncHandler(async (req, res) => {
    try{
        const playdate = await Playdate.findById(req.params.id);
        if(playdate){
            playdate.requests = playdate.requests.filter(request => request._id != req.params.requestId);
            const updatedPlaydate = await playdate.save();
            res.json(updatedPlaydate);
        }
        else{
            res.status(404);
            throw new Error('Playdate not found');
        }
    }
    catch(error){
        res.status(400);
        throw new Error('Invalid request data');
    }
});
  

export {getPlaydates, getPlaydateById, getPlaydatesByUser, createPlaydate, updatePlaydate, deletePlaydate, createRequest, updateRequest, deleteRequest};

