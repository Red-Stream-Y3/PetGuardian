import User from "../models/userModel.js";
import HireRequest from "../models/hireRequestModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// @desc    Get all service providers
// @route   GET /api/v1/services/
// @access  Public
const getProviders = asyncHandler(async (req, res) => {
    const providers = await User.aggregate([
        {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                services: 1,
            },
        },
    ]).hint({ _id: 1, firstName: 1, lastName: 1, services: 1 });
    res.json(providers);
});

// @desc    Get service provider by id
// @route   GET /api/v1/services/:id
// @access  Public
const getProviderById = asyncHandler(async (req, res) => {
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
            },
        },
    ]).hint({ _id: 1, firstName: 1, lastName: 1, services: 1 });
    if (provider) {
        res.json(provider);
    } else {
        res.status(404).send("User not found");
        //throw new Error("User not found");
    }
});

export { getProviders, getProviderById };