import express from 'express';
import RoomController from '../controllers/room.controller';

const router = express.Router();

router.post('/room', RoomController.createRoom);
router.put('/room/:id', RoomController.updateRoom);
router.delete('/room/:id', RoomController.deleteRoom);
router.get('/room/:participants', RoomController.getRoomByParticipants);
router.get('/rooms', RoomController.getRooms);
router.get('/rooms/:id', RoomController.getRoomsWhereIdIsParticipant);

export default router;
