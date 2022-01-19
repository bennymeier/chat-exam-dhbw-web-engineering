import mongoose, { Document, Types } from 'mongoose';
const { Schema } = mongoose;

export interface RoomInterface extends Document {
  name: string;
  roomId: Types.ObjectId;
  userIds: Types.ObjectId[];
  messageIds: Types.ObjectId[];
}

const RoomSchema = new Schema<RoomInterface>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Room Name is missing.'],
    },
    userIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'UserIds is missing.',
      },
    ],
    messageIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: [true, 'MessageIds are missing.'],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
