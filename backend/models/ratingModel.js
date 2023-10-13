import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
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
},
{
    timestamps: true
});

//indexes
ratingSchema.index({ user: 1, serviceProvider: 1 }, { unique: true });
ratingSchema.index({ serviceProvider: 1, createdAt: 1, rating: 1 });

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
