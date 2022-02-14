import mongoose from 'mongoose';
import { MessageSchema } from 'src/types';

const { Schema } = mongoose;
const MessageModel = new Schema<MessageSchema>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is missing.'],
      immutable: true,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'Room', // FIXME: And whats with Chat??
      required: [true, 'Channel ID is missing.'],
      immutable: true,
    },
    content: { type: String, required: [true, 'Content is missing.'] },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model('Message', MessageModel);
