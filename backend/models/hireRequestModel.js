import mongoose from 'mongoose';

const hireRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        serviceProvider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        involvedPets: [{
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Pet",
            required: true,
        }],
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'completed'],
            default: 'pending',
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        daily: {
            type: Boolean,
            required: true,
        },
        weekly: {
            type: Boolean,
            required: true,
        },
        days: {
            type: [String],
        },
        totalFee: {
            type: Number,
            required: true,
        },
        notes: {
            type: String,
            default: "",
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'credit'],
            default: 'cash',
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid'],
            default: 'pending',
        },
        review: {
            type: String,
            default: "",
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const HireRequest = mongoose.model('HireRequest', hireRequestSchema);

export default HireRequest;