import { Request, Response } from 'express';
import Chat from '../models/chat.model';

const createChat = async (req: Request, res: Response) => {
  try {
    let chat = await Chat.create(req.body);
    chat = await Chat.findById(chat._id)
      .populate('partner')
      .populate('creator')
      .lean();
    return res.status(201).json(chat);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Chat couldn't be created!" });
  }
};

const getChat = async (req: Request, res: Response) => {
  try {
    let chat = await Chat.findOne({ _id: req.params.id })
      .populate('partner')
      .populate('creator')
      .lean();
    return res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: 'Chats not found!' });
  }
};

const updateChat = async (req: Request, res: Response) => {
  try {
    const chat = await Chat.updateOne({ _id: req.params.id }, req.body).lean();
    return res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "Chat doesn't exist!" });
  }
};

const deleteChat = async (req: Request, res: Response) => {
  try {
    await Chat.findOneAndDelete({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Chat couldn*t be deleted!' });
  }
};

const getChats = async (req: Request, res: Response) => {
  const q = req.query;
  const filterMe = q.filterme;
  const userId = q.userid;
  const limit = parseInt(q.limit as string) || 0;
  try {
    // Show all chats where userId is not in
    if (filterMe === 'true' && userId) {
      const chats = await Chat.find({})
        .where('partner')
        .nin([userId])
        .populate('partner')
        .limit(limit)
        .lean();
      return res.status(200).json(chats);
    } else if (filterMe === 'false' && userId) {
      // Show all chats where userId is in
      const chats = await Chat.find({})
        .where('partner')
        .in([userId])
        .populate('partner')
        .limit(limit)
        .lean();

      return res.status(200).json(chats);
    } else {
      // Show all chats
      const chats = await Chat.find({}).populate('partner').limit(limit).lean();
      return res.status(200).json(chats);
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: 'Chats not found!' });
  }
};

const getCurrentUserChats = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const chats = await Chat.find({
      $or: [{ creator: userId }, { partner: userId }],
    })
      .populate('creator')
      .populate('partner')
      .populate('lastMessage')
      .lean();
    return res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: 'Chats not found!' });
  }
};

// const searchChat = async (req: Request, res: Response) => {
//   const q = req.query;
//   const currentUserId = q.currentUserId;
//   const searchValue = q.searchValue;
//   const limit = parseInt(q.limit as string) || 0;
//   if (!searchValue) {
//     return res.status(401).json({ error: 'No search value given!' });
//   }
//   const regex = new RegExp(searchValue as string, 'i');
//   const chats = await Chat.find({ _id: { $ne: currentUserId } });
//   const users = Chat.find({
//     $or: [{ firstname: regex }, { lastname: regex }],
//   })
//     .limit(limit)
//     .lean()
//     .exec((err, docs) => {
//       if (err) {
//         return res.status(404).json(err);
//       }
//       return res.status(200).json(chats);
//     });
// };

export default {
  createChat,
  getChat,
  updateChat,
  deleteChat,
  getChats,
  getCurrentUserChats,
};
