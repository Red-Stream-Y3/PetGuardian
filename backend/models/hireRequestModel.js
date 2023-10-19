import mongoose from 'mongoose';

const hireRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        serviceProvider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        involvedPets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Pet',
                required: true
            }
        ],
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
            default: 'pending'
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        daily: {
            type: Boolean,
            required: true
        },
        weekly: {
            type: Boolean,
            required: true
        },
        days: {
            type: [String]
        },
        oneDay: {
            type: Boolean,
            required: true
        },
        continuous: {
            type: Boolean,
            required: true
        },
        totalFee: {
            type: Number,
            required: true
        },
        notes: {
            type: String,
            default: ''
        },
        paymentMethod: {
            type: String,
            enum: ['cash', 'credit'],
            default: 'cash'
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'cancelled'],
            default: 'pending'
        },
        review: {
            type: String,
            default: ''
        },
        rating: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

//indexes for getting a user's hire requests
hireRequestSchema.index({ user: 1, serviceProvider: 1, createdAt: -1 });

//index for getting hire requests for a user
hireRequestSchema.index({
    serviceProvider: 1,
    startDate: 1,
    endDate: 1,
    startTime: 1,
    endTime: 1
});

const HireRequest = mongoose.model('HireRequest', hireRequestSchema);

export default HireRequest;
