import mongoose, { Document, Types } from 'mongoose';
const { Schema } = mongoose;

export interface RoomInterface extends Document {
  name: string;
  description?: string;
  participants: Types.ObjectId[];
  isRoom?: boolean;
}

const RoomSchema = new Schema<RoomInterface>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Participants are missing.'],
        unique: true,
      },
    ],
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    isRoom: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
