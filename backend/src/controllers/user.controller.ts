import { Request, Response } from 'express';
import User from '../models/user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await User.init();
    const data = await user.save();
    return res.status(201).json(data);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(404).json(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).lean();
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "User doesn't exist!" });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).lean();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: 'Users not found!' });
  }
};

const searchUsers = async (req: Request, res: Response) => {
  const q = req.query;
  const value = q.value;
  const limit = parseInt(q.limit as string) || 0;
  if (!value) {
    return res.status(404).json({ error: 'Search value was empty!' });
  }
  try {
    const regex = new RegExp(value as string, 'i');
    const users = await User.find({
      $or: [{ firstname: regex }, { lastname: regex }],
    })
      .limit(limit)
      .lean();
    // const users = await User.find({ firstname: regex });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: err });
  }
};

const getUserStatus = async (req: Request, res: Response) => {
  try {
    const status = await User.findById(req.params.id, { status: 1 }).lean();
    return res.status(200).json(status);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "User doesn't exist!" });
  }
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  searchUsers,
  getUserStatus,
};
