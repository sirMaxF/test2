import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: { type: String, default: true, unique: true },
        email: { type: String, default: true, unique: true },
        password: { type: String, default: true },
        prifilePic: { type: String, default: '' },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
)

export const userModel = mongoose.model('User', userSchema) 