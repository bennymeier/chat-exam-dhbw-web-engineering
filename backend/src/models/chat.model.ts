import mongoose from 'mongoose';
import { ChatSchema } from 'src/types';

const { Schema } = mongoose;
const ChatModel = new Schema<ChatSchema>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    name: {
      type: String,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model('Chat', ChatModel);
