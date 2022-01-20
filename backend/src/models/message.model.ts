import mongoose, { Document, Types } from 'mongoose';
const { Schema } = mongoose;

export interface MessageInterface extends Document {
  senderId: Types.ObjectId;
  roomId: Types.ObjectId;
  content: string;
}

const MessageSchema = new Schema<MessageInterface>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender ID is missing.'],
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Room ID is missing.'],
    },
    content: { type: String, required: [true, 'Content is missing.'] },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model('Message', MessageSchema);
