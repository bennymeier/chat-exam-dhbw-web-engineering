import express from 'express';
import ChatController from '../controllers/chat.controller';

const router = express.Router();

router.post('/chat', ChatController.createChat);
router.put('/chat/:id', ChatController.updateChat);
router.delete('/chat/:id', ChatController.deleteChat);
router.get('/chat/:id', ChatController.getChat);
router.get('/chats/:query', ChatController.getChats);
router.get('/chats/user/:id', ChatController.getCurrentUserChats);

export default router;
