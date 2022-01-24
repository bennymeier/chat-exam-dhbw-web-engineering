import { Request, Response } from 'express';
import Message from '../models/message.model';

const createMessage = async (req: Request, res: Response) => {
  try {
    const message = new Message(req.body);
    const data = await message.save();
    return res.status(201).json(data);
  } catch {
    return res.status(400).json({ error: "Message couldn't be created!" });
  }
};

const updateMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json(message);
  } catch {
    return res.status(404).json({ error: "Message doesn't exist!" });
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    await Message.findOneAndDelete({ _id: req.params.id });
    return res.status(204).send();
  } catch {
    return res.status(400).json({ error: 'Message couldn*t be deleted!' });
  }
};

const getMessageById = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne({ _id: req.params.id });
    return res.status(200).json(message);
  } catch {
    return res.status(404).json({ error: "Message doesn't exist!" });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({});
    return res.status(200).json(messages);
  } catch {
    return res.status(404).json({ error: 'Messages not found!' });
  }
};

const getMessagesByRoomId = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ roomId: req.params.id });
    return res.status(200).json(messages);
  } catch {
    return res.status(404).json({ error: 'Messages not found!' });
  }
};

export default {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessageById,
  getMessages,
  getMessagesByRoomId,
};
