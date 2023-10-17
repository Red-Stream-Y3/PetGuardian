import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            required: true,
        },
        type: {
            type: String,
            enum: ['Lost', 'Found'],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            default: [],
        },
        date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        location: {
            type: String,
            default: '',
            required: true,
        },
        status: {
            type: String,
            enum: ['open', 'closed'],
            default: 'open',
        },
    },
    {
        timestamps: true,
    },
);

const Post = mongoose.model('Post', postSchema);

export default Post;
