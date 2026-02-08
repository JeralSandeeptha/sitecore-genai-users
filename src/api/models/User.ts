import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    vo_api_key: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    }
}, {
    timestamps: true,
});

export const UserModel = mongoose.model('User', UserSchema);