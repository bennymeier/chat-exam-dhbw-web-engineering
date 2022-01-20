import { Request, Response } from 'express';
import User from '../models/user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const data = await user.save();
    return res.status(201).json(data);
  } catch {
    return res.status(400).json({ error: "User couldn't be created!" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json(user);
  } catch {
    return res.status(404).json({ error: "User doesn't exist!" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    return res.status(204).send();
  } catch {
    return res.status(400).json({ error: 'User couldn*t be deleted!' });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).json(user);
  } catch {
    return res.status(404).json({ error: "User doesn't exist!" });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch {
    return res.status(404).json({ error: 'Users not found!' });
  }
};

const getUsersByParticipants = async (req: Request, res: Response) => {
  const participants = JSON.parse(req.params.participants);
  try {
    const users = await User.find().where('_id').in(participants);
    return res.status(200).json({ isNew: false, users });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: "Room doesn't exist!" });
  }
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  getUsersByParticipants,
};
