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
                $match: {
                    isServiceProvider: true,
                },
            },
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
        res.status(404).send({ error: "No service providers found" });
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
                },
            },
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
        if (provider) {
            res.json(provider);
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
});

// @desc    Hire a service provider
// @route   POST /api/v1/services/hire
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
        res.status(201).json({ message: "Hire request created" });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// @desc    Get hire requests made by a user
// @route   GET /api/v1/services/hire/:id
// @access  Public
const getHireRequests = asyncHandler(async (req, res) => {
    try {
        const hireRequests = await HireRequest.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "serviceProvider",
                    foreignField: "_id",
                    as: "serviceProvider",
                },
            },
            {
                $unwind: "$serviceProvider",
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    startDate: 1,
                    endDate: 1,
                    startTime: 1,
                    endTime: 1,
                    oneDay: 1,
                    //totalFee: 1,
                    serviceProvider: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        profilePic: 1,
                    },
                },
            },
        ]).hint({ user: 1, serviceProvider: 1 });
        res.json(hireRequests);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// @desc    Get hire requests recieved by a service provider
// @route   GET /api/v1/services/myhire/:id
// @access  Public
const getMyHireRequests = asyncHandler(async (req, res) => {
    try {
        const hireRequests = await HireRequest.aggregate([
            {
                $match: {
                    serviceProvider: new mongoose.Types.ObjectId(req.params.id),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    startDate: 1,
                    endDate: 1,
                    startTime: 1,
                    endTime: 1,
                    totalFee: 1,
                    user: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        profilePic: 1,
                    },
                },
            },
        ]).hint({ user: 1, serviceProvider: 1 });
        res.json(hireRequests);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// @desc    Check if provider is already hired for a given time range
// @route   POST /api/v1/services/hire/check
// @access  Public
const checkHireRequests = asyncHandler(async (req, res) => {
    const { serviceProvider, startDate, endDate, startTime, endTime } =
        req.body;
    try {
        const hireRequests = await HireRequest.aggregate([
            {
                $match: {
                    serviceProvider: new mongoose.Types.ObjectId(
                        serviceProvider
                    ),
                },
            },
            {
                $match: {
                    $or: [
                        {
                            $and: [
                                { startDate: { $gte: new Date(startDate) } },
                                { startDate: { $lte: new Date(endDate) } },
                            ],
                        },
                        {
                            $and: [
                                { endDate: { $gte: new Date(startDate) } },
                                { endDate: { $lte: new Date(endDate) } },
                            ],
                        },
                        {
                            $and: [
                                { startDate: { $lte: new Date(startDate) } },
                                { endDate: { $gte: new Date(endDate) } },
                            ],
                        },
                    ],
                },
            },
            {
                $project: {
                    _id: 1,
                    startDate: 1,
                    endDate: 1,
                    startTime: 1,
                    endTime: 1,
                },
            },
        ]).hint({
            serviceProvider: 1,
            startDate: 1,
            endDate: 1,
            startTime: 1,
            endTime: 1,
        });

        const hireRequestsFiltered = hireRequests.filter((hireRequest) => {
            const hireRequestStartTime = new Date(
                startDate +
                    "T" +
                    new Date(hireRequest.startTime).toISOString().split("T")[1]
            );
            const hireRequestEndTime = new Date(
                startDate +
                    "T" +
                    new Date(hireRequest.endTime).toISOString().split("T")[1]
            );
            const startTimeDate = new Date(startDate + "T" + startTime);
            const endTimeDate = new Date(endDate + "T" + endTime);

            return (
                (hireRequestStartTime >= startTimeDate &&
                    hireRequestStartTime < endTimeDate) ||
                (hireRequestEndTime > startTimeDate &&
                    hireRequestEndTime <= endTimeDate)
            );
        });

        res.json(hireRequestsFiltered);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// @desc    Update hire request status
// @route   PUT /api/v1/services/hire
// @access  Private
const updateHireRequest = asyncHandler(async (req, res) => {
    try {
        const { status, _id } = req.body;

        const result = await HireRequest.findOne({ _id: _id });

        if (result) {
            result.status = status;
            result.save();
            res.json({ message: "Hire request updated" });
        } else {
            throw new Error("Hire request not found");
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// @desc    get hire request by id
// @route   GET /api/v1/services/hire/getbyid/:id
// @access  Private
const getHireRequestById = asyncHandler(async (req, res) => {
    try {
        const hireRequest = await HireRequest.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
            },
            {
                $lookup: {
                    from: "pets",
                    localField: "involvedPets",
                    foreignField: "_id",
                    as: "involvedPets",
                },
            },
        ]);

        if (hireRequest) {
            res.json(hireRequest);
        } else {
            res.json({ error: "Hire request not found" });
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// @desc    create service provider
// @route   POST /api/v1/services/create
// @access  Private
const createServiceProvider = asyncHandler(async (req, res) => {
    try {
        const {
            serviceTypes,
            petTypes,
            description,
            workDays,
            businessPhone,
            activeCities,
            fees,
        } = req.body;

        const { _id } = req.user;

        const userExists = await User.findById(_id);

        if (!userExists) {
            throw new Error("Could not find user");
        }

        userExists.services = {
            serviceTypes,
            petTypes,
            description,
            workDays,
            businessPhone,
            activeCities,
            fees,
        };
        userExists.isServiceProvider = true;

        const user = await userExists.save();

        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                services: user.services,
            });
        } else {
            throw new Error("Invalid data");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export {
    getProviders,
    getProviderById,
    hireProvider,
    getHireRequests,
    getMyHireRequests,
    checkHireRequests,
    updateHireRequest,
    getHireRequestById,
    createServiceProvider,
};
