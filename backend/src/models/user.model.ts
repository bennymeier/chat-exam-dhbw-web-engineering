import mongoose, { Document, Types } from 'mongoose';
const { Schema } = mongoose;

export type Status = 'Online' | 'Busy' | 'Do not disturb' | 'Away' | 'Offline';
export interface UserInterface extends Document {
  username: string;
  mail: string;
  password?: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: Status;
  chats: string[];
  lastChatId: Types.ObjectId;
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
    password: {
      type: String,
      // required: [true, 'Please use a password.'],
      //   default: 'abc123',
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
    },
    chats: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastChatId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
