import { Request, Response } from 'express';
import User from '../models/user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const data = await user.save();
    return res.status(201).json({
      success: true,
      id: data._id,
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json({
      success: true,
      id: user.upsertedId,
    });
  } catch (err) {
    return res.status(404).json({ success: false, error: err });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

export default { createUser, updateUser, deleteUser, getUserById, getUsers };
