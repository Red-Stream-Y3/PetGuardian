import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            pattern: '^[a-zA-Z0-9_]*$',
            unique: true
        },
        firstName: {
            type: String,
            pattern: '^[a-zA-Z]*$',
            default: ''
        },
        lastName: {
            type: String,
            pattern: '^[a-zA-Z]*$',
            default: ''
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            street: { type: String, default: '' },
            city: { type: String, default: '' },
            state: { type: String, default: '' },
            zip: { type: String, default: '' },
            country: { type: String, default: '' }
        },
        phone: {
            type: String,
            default: '',
            pattern: '^[0-9]*$'
        },
        profilePic: {
            type: String,
            default:
                'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'
        },
        isServiceProvider: {
            type: Boolean,
            default: false,
            required: true
        },
        services: {
            serviceTypes: [String],
            petTypes: [String],
            description: { type: String },
            workDays: [String],
            businessPhone: [
                {
                    type: String,
                    default: '',
                    pattern: '^[0-9]*$'
                }
            ],
            activeCities: [String],
            fees: [
                {
                    tag: { type: String },
                    price: { type: Number }
                }
            ]
        }
    },
    {
        timestamps: true
    }
);

//create compound index for service providers
userSchema.index(
    { _id: 1, firstName: 1, lastName: 1, services: 1 },
    { partialFilterExpression: { services: { $exists: true } } }
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        // if the password is not modified, then do not hash it again
        next();
    }

    const salt = await bcrypt.genSalt(10); // 10 rounds of encryption
    this.password = await bcrypt.hash(this.password, salt); // hash the password with salt value
});

const User = mongoose.model('User', userSchema);

export default User;
