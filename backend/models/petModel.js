import mongoose from 'mongoose';

const petSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    breed: {
      type: String,
      required: true
    },
    age: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: [String],
      required: true,
      default: []
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
