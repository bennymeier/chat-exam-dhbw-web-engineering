import { Request, Response } from 'express';
import Message from '../models/message.model';

const createMessage = async (req: Request, res: Response) => {
  try {
    const message = new Message(req.body);
    const data = await message.save();
    return res.status(201).json({
      success: true,
      id: data._id,
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const updateMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json({
      success: true,
      id: message.upsertedId,
    });
  } catch (err) {
    return res.status(404).json({ success: false, error: err });
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    await Message.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const getMessageById = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne({ _id: req.params.id });
    return res.status(200).json({ success: true, data: message });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({});
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

export default {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessageById,
  getMessages,
};
