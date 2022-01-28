import mongoose from 'mongoose';
import { UserSchema } from 'src/types';

const { Schema } = mongoose;
const UserModel = new Schema<UserSchema>(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Username is missing.'],
      immutable: true,
    },
    mail: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'E-Mail is missing.'],
      immutable: true,
    },
    firstname: {
      type: String,
      trim: true,
      required: [true, 'Firstname is missing.'],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, 'Lastname is missing.'],
    },
    avatar: {
      type: String,
    },
    status: {
      type: String,
      default: 'offline',
    },
    lastChannel: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    lastChannelType: {
      type: String,
      default: 'room',
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserModel);
