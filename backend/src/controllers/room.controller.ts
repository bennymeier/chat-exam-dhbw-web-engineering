import { Request, Response } from 'express';
import Room from '../models/room.model';

const createRoom = async (req: Request, res: Response) => {
  try {
    const room = new Room(req.body);
    const data = await room.save();
    return res.status(201).json(data);
  } catch {
    return res.status(400).json({ error: "Room couldn't be created!" });
  }
};

const updateRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json(room);
  } catch {
    return res.status(404).json({ error: "Room doesn't exist!" });
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  try {
    await Room.findOneAndDelete({ _id: req.params.id });
    return res.status(204).send();
  } catch {
    return res.status(400).json({ error: 'Room couldn*t be deleted!' });
  }
};

const getRoomByParticipants = async (req: Request, res: Response) => {
  const participants = JSON.parse(req.params.participants);
  try {
    // Search if there is already a room with those participants
    const room = await Room.findOne().where('participants').all(participants);
    // Create room if there is none
    if (!room) {
      const newRoom = new Room({ participants });
      const data = await newRoom.save();
      return res.status(200).json({ isNew: true, room: data });
    }
    return res.status(200).json({ isNew: false, room });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: "Room doesn't exist!" });
  }
};

const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({});
    return res.status(200).json(rooms);
  } catch {
    return res.status(404).json({ error: 'Rooms not found!' });
  }
};

/**
 * Get all rooms where the given ID is in the participant array.
 */
const getRoomsWhereIdIsParticipant = async (req: Request, res: Response) => {
  const id = JSON.parse(req.params.id);
  try {
    const rooms = await Room.find({}).where("participants").in(id)
    return res.status(200).json(rooms);
  } catch {
    return res.status(404).json({ error: 'Rooms not found!' });
  }
};

export default {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomByParticipants,
  getRooms,
  getRoomsWhereIdIsParticipant
};
