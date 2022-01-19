import { Request, Response } from 'express';
import Room from '../models/room.model';

const createRoom = async (req: Request, res: Response) => {
  try {
    const room = new Room(req.body);
    const data = await room.save();
    return res.status(201).json({
      success: true,
      id: data._id,
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const updateRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json({
      success: true,
      id: room.upsertedId,
    });
  } catch (err) {
    return res.status(404).json({ success: false, error: err });
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  try {
    await Room.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    return res.status(200).json({ success: true, data: room });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({});
    return res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

export default { createRoom, updateRoom, deleteRoom, getRoomById, getRooms };
