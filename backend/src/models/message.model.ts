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
      refPath: 'conversationType',
      required: true,
    },
    conversationType: {
      type: String,
      required: true,
      enum: ['Chat', 'Room'],
    },
    content: { type: String, required: [true, 'Content is missing.'] },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model('Message', MessageModel);
