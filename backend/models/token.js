import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

const Token = mongoose.model('token', tokenSchema);

export default Token;