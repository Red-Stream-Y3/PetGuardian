import Rating from "../models/ratingModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all ratings for a service provider
// @route   GET /api/v1/ratings/:id
// @access  Public
const getRatingById = asyncHandler(async (req, res) => {
    const rating = await Rating.aggregate([
        {
            $match: { serviceProvider: req.params.id }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            }
        },
        {
            $unwind: "$user"
        },
        {
            $limit: 10
        },
        {
            $project: {
                _id: 0,
                rating: 1,
                review: 1,
                createdAt: 1,
                user: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    image: 1,
                }
            }
        }
    ]).hint({ serviceProvider: 1, createdAt: 1, rating: 1 });

    if (rating) {
        res.json(rating);
    } else {
        res.status(404).json({ message: "Rating not found" });
    }
});

// @desc    Create new rating
// @route   POST /api/v1/ratings
// @access  Private
const createRating = asyncHandler(async (req, res) => {
    const { rating, review, user, serviceProvider } = req.body;

    try {
        const newRating = new Rating({
            rating,
            review,
            user,
            serviceProvider,
        });
    
        const createdRating = await newRating.save();
    
        res.status(201).json(createdRating);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get rating for a service provider
// @route   GET /api/v1/ratings/:id
// @access  Public
const getRatingByServiceProvider = asyncHandler(async (req, res) => {
    const serviceProvider = req.params.id;

    try {
        const ratings = await Rating.aggregate([
            {
                $match: { serviceProvider: serviceProvider }
            },
            {
                $group: {
                    _id: "$serviceProvider",
                    averageRating: { $avg: "$rating" },
                    count: { $sum: 1 },
                }
            },
            {
                $project: {
                    _id: 0,
                    averageRating: 1,
                    count: 1,
                }
            }
        ]).hint({ serviceProvider: 1, createdAt: 1, rating: 1 });

        res.status(200).json(ratings);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// @desc    Get rating created by a user for a service provider
// @route   GET /api/v1/ratings/user/:uid/:sid
// @access  Public
const getRatingByUserAndServiceProvider = asyncHandler(async (req, res) => {
    const { uid, sid } = req.params;

    try {
        const rating = await Rating.findOne({ user:uid, serviceProvider:sid }).hint({ user: 1, serviceProvider: 1 });

        res.status(200).json(rating);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// @desc    Update rating created by a user for a service provider
// @route   PUT /api/v1/ratings/user/:uid/:sid
// @access  Private
const updateRatingByUserAndServiceProvider = asyncHandler(async (req, res) => {
    const { uid, sid } = req.params;
    const { rating, review } = req.body;

    try {
        const updatedRating = await Rating.findOne({ user:uid, serviceProvider:sid }).hint({ user: 1, serviceProvider: 1 });

        updatedRating.rating = rating;
        updatedRating.review = review;

        await updatedRating.save();

        res.status(200).json(updatedRating);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export {
    getRatingById,
    createRating,
    getRatingByServiceProvider,
    getRatingByUserAndServiceProvider,
    updateRatingByUserAndServiceProvider,
};