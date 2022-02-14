import { Request, Response } from 'express';
import Message from '../models/message.model';

const createMessage = async (req: Request, res: Response) => {
  try {
    const message = new Message(req.body);
    const data = await message.save();
    const newMessage = await Message.findById(data._id)
      .populate('sender')
      .populate('channel');
    return res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Message couldn't be created!" });
  }
};

const updateMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json(message);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "Message doesn't exist!" });
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    await Message.findOneAndDelete({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Message couldn*t be deleted!' });
  }
};

const getMessageById = async (req: Request, res: Response) => {
  try {
    const message = await Message.findOne({ _id: req.params.id }).lean();
    return res.status(200).json(message);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "Message doesn't exist!" });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({}).lean();
    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: 'Messages not found!' });
  }
};

const getMessagesByRoomId = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ channel: req.params.id })
      .populate('sender')
      .lean();
    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
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
