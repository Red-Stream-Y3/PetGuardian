import mongoose from 'mongoose';

const adoptionRequestSchema = mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const adoptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    species: {
      type: String,
      enum: ['dog', 'cat', 'other'],
      required: true
    },
    breed: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    image: {
      type: [String],
      required: true,
      default: []
    },
    currentOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    adoptionRequests: [adoptionRequestSchema],
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending'
    },
    vaccinated: {
      type: Boolean,
      default: false
    },
    healthStatus: {
      type: String,
      enum: ['healthy', 'sick', 'injured'],
      default: 'healthy'
    },
    healthDescriptiopn: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Adoption = mongoose.model('Adoption', adoptionSchema);

export default Adoption;
