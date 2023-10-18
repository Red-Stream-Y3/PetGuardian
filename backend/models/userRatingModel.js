import mongoose from 'mongoose';

const userRatingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true
    },
    review: {
      type: String,
      default: ''
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const UserRating = mongoose.model('UserRating', userRatingSchema);

export default UserRating;
