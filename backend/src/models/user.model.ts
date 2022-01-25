import mongoose, { Document, Types } from 'mongoose';
const { Schema } = mongoose;

export interface UserInterface extends Document {
  username: string;
  mail: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: string;
  lastRoomId: Types.ObjectId;
}

const UserSchema = new Schema<UserInterface>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is missing.'],
    },
    mail: {
      type: String,
      unique: true,
      required: [true, 'E-Mail is missing.'],
    },
    firstname: {
      type: String,
      required: [true, 'Firstname is missing.'],
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is missing.'],
    },
    avatar: {
      type: Buffer,
    },
    status: {
      type: String,
      default: 'offline',
    },
    lastRoomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
