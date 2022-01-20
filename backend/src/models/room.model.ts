import mongoose, { Document, Types } from 'mongoose';
const { Schema } = mongoose;

export interface RoomInterface extends Document {
  name?: string;
  participants: Types.ObjectId[];
}

const RoomSchema = new Schema<RoomInterface>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Participants are missing.'],
      },
    ],
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
