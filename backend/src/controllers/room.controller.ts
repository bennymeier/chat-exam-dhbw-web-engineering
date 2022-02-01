import { Request, Response } from 'express';
import Room from '../models/room.model';

const createRoom = async (req: Request, res: Response) => {
  try {
    let room = await Room.create(req.body);
    room = await Room.findById(room._id)
      .populate('participants')
      .populate('creator');
    return res.status(201).json(room);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Room couldn't be created!" });
  }
};

const getRoom = async (req: Request, res: Response) => {
  try {
    let room = await Room.findOne({ _id: req.params.id })
      .populate('participants')
      .populate('creator')
      .lean();
    if (!room?.isRoom) {
    }
    return res.status(200).json(room);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: 'Rooms not found!' });
  }
};

const updateRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json(room);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "Room doesn't exist!" });
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  try {
    await Room.findOneAndDelete({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Room couldn*t be deleted!' });
  }
};

const getRooms = async (req: Request, res: Response) => {
  const q = req.query;
  const filterMe = q.filterme;
  const userId = q.userid;
  const limit = parseInt(q.limit as string) || 0;
  try {
    // Show all rooms where userId is not in
    if (filterMe === 'true' && userId) {
      const rooms = await Room.find({ creator: { $ne: [userId] } })
        .where('participants')
        .nin([userId])
        .populate('participants')
        .populate('creator')
        .limit(limit)
        .lean();

      return res.status(200).json(rooms);
    } else if (filterMe === 'false' && userId) {
      // Show all rooms where userId is in
      const rooms = await Room.find({})
        .where('participants')
        .in([userId])
        .populate('participants')
        .populate('creator')
        .limit(limit)
        .lean();

      return res.status(200).json(rooms);
    } else {
      // Show all rooms
      const rooms = await Room.find({})
        .populate('participants')
        .populate('creator')
        .limit(limit)
        .lean();

      return res.status(200).json(rooms);
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: 'Rooms not found!' });
  }
};

const joinRoom = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  const userId = req.body.userId;
  try {
    const room = await Room.findById(roomId);
    const participants = new Set([...room.participants, userId]);
    const data = await Room.findByIdAndUpdate(roomId, {
      participants: [...participants],
    })
      .populate('creator')
      .populate('participants')
      .lean();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "Room doesn't exist!" });
  }
};

const leaveRoom = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  const userId = req.body.userId;
  try {
    const room = await Room.findById(roomId);
    const participants = room.participants.filter(
      (participant: string) => participant !== userId
    );
    const data = await Room.findByIdAndUpdate(roomId, {
      participants: [...participants],
    })
      .populate('creator')
      .populate('participants')
      .lean();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "Room doesn't exist!" });
  }
};

const searchRoom = async (req: Request, res: Response) => {
  const q = req.query;
  const currentUserId = q.currentUserId;
  const searchValue = q.searchValue;
  const limit = parseInt(q.limit as string) || 0;
  if (!searchValue) {
    return res.status(401).json({ error: 'No search value given!' });
  }
  const regex = new RegExp(searchValue as string, 'i');
  const rooms = await Room.find({ _id: { $ne: currentUserId } });
  const users = Room.find({
    $or: [{ firstname: regex }, { lastname: regex }],
  })
    .limit(limit)
    .lean()
    .exec((err, docs) => {
      if (err) {
        return res.status(404).json(err);
      }
      return res.status(200).json(docs);
    });
};

const getCurrentUserRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({ creator: req.params.id })
      .populate('creator')
      .populate('participants')
      .populate('lastMessage')
      .lean();
    return res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: 'Rooms not found!' });
  }
};

export default {
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  getRooms,
  joinRoom,
  leaveRoom,
  searchRoom,
  getCurrentUserRooms,
};
