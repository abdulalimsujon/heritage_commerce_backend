import mongoose, { Schema } from 'mongoose';
import { Tuser } from './user.interface';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    status: { type: String, enum: ['Active', 'Block'], default: 'Active' },
    password: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<Tuser>('user', UserSchema);
