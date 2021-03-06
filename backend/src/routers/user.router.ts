import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);
router.get('/user/:id', UserController.getUserById);
router.get('/users', UserController.getUsers);
router.get('/users/:query', UserController.searchUsers);
router.get('/user/status/:id', UserController.getUserStatus);

export default router;
