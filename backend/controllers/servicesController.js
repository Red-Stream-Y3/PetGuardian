import User from "../models/userModel.js";
import HireRequest from "../models/hireRequestModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// @desc    Get all service providers
// @route   GET /api/v1/services/
// @access  Public
const getProviders = asyncHandler(async (req, res) => {
    try {
        const providers = await User.aggregate([
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    services: 1,
                    profilePic: 1,
                },
            },
        ]).hint({ _id: 1, firstName: 1, lastName: 1, services: 1 });
        res.json(providers);
    } catch (error) {
        res.status(404).send({error:"No service providers found"});
    }
});

// @desc    Get service provider by id
// @route   GET /api/v1/services/:id
// @access  Public
const getProviderById = asyncHandler(async (req, res) => {
    try {
        const provider = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id),
                }
            },{
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    services: 1,
                    profilePic: 1,
                },
            },
        ]).hint({ _id: 1, firstName: 1, lastName: 1, services: 1 });
        if (provider) {
            res.json(provider);
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(404).send({error:error.message});
    }
});

// @desc    Hire a service provider
// @route   POST /api/v1/hire
// @access  Private
const hireProvider = asyncHandler(async (req, res) => {
    const {
        user,
        serviceProvider,
        involvedPets,
        startDate,
        endDate,
        startTime,
        endTime,
        daily,
        weekly,
        days,
        oneDay,
        continuous,
        totalFee,
        notes,
        paymentMethod,
    } = req.body;

    const hireRequest = new HireRequest({
        user,
        serviceProvider,
        involvedPets,
        status: "pending",
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime: new Date(startDate + "T" + startTime),
        endTime: new Date(startDate + "T" + endTime),
        daily,
        weekly,
        days,
        oneDay,
        continuous,
        totalFee,
        notes,
        paymentMethod,
        paymentStatus: "pending",
    });

    try {
        const createdHireRequest = await hireRequest.save();
        res.status(201).json({message:'Hire request created'});
    } catch (error) {
        res.json({error:error.message});
    }
});

// @desc    Get hire requests made by a user
// @route   GET /api/v1/hire/:id
// @access  Public
const getHireRequests = asyncHandler(async (req, res) => {
    try {
        const hireRequests = await HireRequest.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.params.id),
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "serviceProvider",
                    foreignField: "_id",
                    as: "serviceProvider",
                }
            },{
                $unwind: "$serviceProvider",
            },{
                $project: {
                    _id: 1,
                    status: 1,
                    startDate: 1,
                    endDate: 1,
                    startTime: 1,
                    endTime: 1,
                    //totalFee: 1,
                    serviceProvider: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        profilePic: 1,
                    },
                },
            }
        ]);
        res.json(hireRequests);
    } catch (error) {
        res.json({error:error.message});
    }
});

// @desc    Get hire requests recieved by a service provider
// @route   GET /api/v1/myhire/:id
// @access  Public
const getMyHireRequests = asyncHandler(async (req, res) => {
    try {
        const hireRequests = await HireRequest.aggregate([
            {
                $match: {
                    serviceProvider: new mongoose.Types.ObjectId(req.params.id),
                }
            },{
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                }
            },{
                $unwind: "$user",
            },{
                $project: {
                    _id: 1,
                    status: 1,
                    startDate: 1,
                    endDate: 1,
                    startTime: 1,
                    endTime: 1,
                    //totalFee: 1,
                    user: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        profilePic: 1,
                    },
                },
            }
        ]);
        res.json(hireRequests);
    } catch (error) {
        res.json({error:error.message});
    }
});

// @desc    Check if provider is already hired for a given time range
// @route   GET /api/v1/hire/check/:id
// @access  Public
const checkHireRequests = asyncHandler(async (req, res) => {
    const { startDate, endDate, startTime, endTime } = req.body;
    try {
        const hireRequests = await HireRequest.aggregate([
            {
                $match: {
                    serviceProvider: req.params.id,
                    startDate: { $gte: startDate },
                    endDate: { $lte: endDate },
                }
            },{
                $project: {
                    _id: 1,
                    startDate: 1,
                    endDate: 1,
                    startTime: 1,
                    endTime: 1,
                },
            }
        ]).hint({ serviceProvider: 1, startDate: 1, endDate: 1, startTime: 1, endTime: 1 });
        res.json(hireRequests);
    } catch (error) {
        res.json({error:error.message});
    }
});

export {
    getProviders,
    getProviderById,
    hireProvider,
    getHireRequests,
    getMyHireRequests,
    checkHireRequests,
};