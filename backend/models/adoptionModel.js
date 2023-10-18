import mongoose from 'mongoose';

const adoptionRequestSchema = new mongoose.Schema(
    {
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            required: true,
        },
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    },
);

const adoptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        species: {
            type: String,
            enum: ['dog', 'cat', 'other'],
            required: true,
        },
        breed: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        currentOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        adoptionRequests: [adoptionRequestSchema],
    },
    {
        timestamps: true,
    },
);

const Adoption = mongoose.model('Adoption', adoptionSchema);

export default Adoption;
