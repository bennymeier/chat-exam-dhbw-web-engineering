import mongoose from 'mongoose';
import { RoomSchema } from 'src/types';

const { Schema } = mongoose;
const RoomModel = new Schema<RoomSchema>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model('Room', RoomModel);
