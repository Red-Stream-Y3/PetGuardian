import mongoose from 'mongoose';

const requestSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        pets:[
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Pet',
            },
        ],
        status:{
            type: String,
            required: true,
            default: 'pending',
        },
        description:{
            type: String,
        },
        contactNo:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const playdateSchema = mongoose.Schema(
    {
        date:{
            type: Date,
            required: true,
        },
        time:{
            type: String,
            required: true,
        },
        location:{
            type: String,
            required: true,
        },
        description:
        {
            type: String,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        pets:[
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Pet',
            },
        ],
        requests:[
            requestSchema,
        ],
    },
    {
        timestamps: true,
    }
);

const Playdate = mongoose.model('Playdate', playdateSchema);

export default Playdate;