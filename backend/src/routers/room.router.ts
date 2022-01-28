import express from 'express';
import RoomController from '../controllers/room.controller';

const router = express.Router();

router.post('/room', RoomController.createRoom);
router.put('/room/:id', RoomController.updateRoom);
router.delete('/room/:id', RoomController.deleteRoom);
router.get('/room/:id', RoomController.getRoom);
router.get('/rooms/:query', RoomController.getRooms);
router.put('/room/join/:id', RoomController.joinRoom);
router.put('/room/leave/:id', RoomController.leaveRoom);
router.get('/rooms/search/:params', RoomController.searchRoom);
router.get('/rooms/user/:id', RoomController.getCurrentUserRooms);

export default router;
