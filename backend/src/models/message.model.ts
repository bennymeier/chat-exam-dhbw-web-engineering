import mongoose, { Document, Types } from 'mongoose';
const { Schema } = mongoose;

export interface MessageInterface extends Document {
  roomId: Types.ObjectId;
  userId: Types.ObjectId;
  messageBody: string;
  isDeleted: boolean;
}

const MessageSchema = new Schema<MessageInterface>(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'RoomId is missing.'],
    },
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is missing.'],
      },
    ],
    messageBody: { type: String, required: [true, 'Message Body is missing.'] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model('Message', MessageSchema);
