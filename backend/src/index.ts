import express from 'express';
import cors from 'cors';
import { establishMongoDBConnection } from './db.connection';
import RoomRouter from './routers/room.router';
import UserRouter from './routers/user.router';
import MessageRouter from './routers/message.router';
import { establishSocketConnection } from './socket.connection';
import { MessageInterface } from './models/message.model';
import { UserInterface } from './models/user.model';
import Room, { RoomInterface } from './models/room.model';

const apiPort = 3001 || process.env.PORT;

const app = express();
const io = establishSocketConnection(app);

app.use(cors());
app.use(express.json());
app.use('/api', [RoomRouter, UserRouter, MessageRouter]);

establishMongoDBConnection();

app.listen(apiPort, () => {
  console.log('Server listening on port: ', apiPort);
});

io.on('connection', (socket) => {
  const currentUser = socket.handshake.auth;

  // Room created
  socket.on('room:created', (room: RoomInterface) => {
    socket.broadcast.emit('room:created', room);
  });

  // Room deleted
  socket.on('room:deleted', (room: RoomInterface) => {
    socket.broadcast.emit('room:deleted', room);
  });

  // Chat created
  socket.on('chat:created', (chat: RoomInterface) => {
    socket.broadcast.emit('chat:created', chat);
  });

  // Chat deleted
  socket.on('chat:deleted', (chat: RoomInterface) => {
    socket.broadcast.emit('chat:deleted', chat);
  });

  // User joined room
  socket.on('room:join', (room: RoomInterface) => {
    socket.join(room._id);
  });

  // User left room
  socket.on('room:leave', (room: RoomInterface) => {
    socket.leave(room._id);
  });

  // User sent message
  socket.on('message', ({ message }: { message: MessageInterface }) => {
    socket.to(message.roomId.toString()).emit('message', message);
  });

  // Online Status changed
  socket.on(
    'status:change',
    ({ user, status }: { user: UserInterface; status: any }) => {
      socket.broadcast.emit('status:change', { user, status });
    }
  );

  // Avatar changed
  socket.on('avatar:change', () => {
    console.log('Someone changed his avatar.');
  });

  // User is typing
  socket.on(
    'user:typing',
    ({
      currentUser,
      currentRoom,
    }: {
      currentUser: UserInterface;
      currentRoom: RoomInterface;
    }) => {
      socket.to(currentRoom._id).emit('user:typing', [currentUser]);
    }
  );
});
