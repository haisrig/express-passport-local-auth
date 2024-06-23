import mongoose from 'mongoose';
import { IUser } from '../../types/types';

const UserSchema = new mongoose.Schema<IUser>({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    displayName: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }
});

export const User = mongoose.model("user", UserSchema);