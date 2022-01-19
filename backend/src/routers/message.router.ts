import express from 'express';
import MessageController from '../controllers/message.controller';

const router = express.Router();

router.post('/message', MessageController.createMessage);
router.put('/message/:id', MessageController.updateMessage);
router.delete('/message/:id', MessageController.deleteMessage);
router.get('/message/:id', MessageController.getMessageById);
router.get('/messages', MessageController.getMessages);

export default router;
