import express from 'express';
import cors from 'cors';
import { establishMongoDBConnection } from './db.connection';
import RoomRouter from './routers/room.router';
import ChatRouter from './routers/chat.router';
import UserRouter from './routers/user.router';
import MessageRouter from './routers/message.router';
import { establishSocketConnection } from './socket.connection';
import { Room, Message, User, Chat, Channel } from './types';

const apiPort = 3001 || process.env.PORT;

const app = express();
const io = establishSocketConnection(app);

app.use(cors());
app.use(express.json());
app.use('/api', [RoomRouter, ChatRouter, UserRouter, MessageRouter]);

establishMongoDBConnection();

app.listen(apiPort, () => {
  console.log('Server listening on port: ', apiPort);
});

io.on('connection', (socket) => {
  const currentUser = socket.handshake.auth;
  socket.join(currentUser._id);

  // Room created
  socket.on('room:created', (room: Room) => {
    socket.broadcast.emit('room:created', room);
  });

  // Room deleted
  socket.on('room:deleted', (room: Room) => {
    socket.broadcast.emit('room:deleted', room);
  });

  // Chat created
  socket.on('chat:create', (chat: Chat) => {
    console.log('Chat ', chat);
    console.log(`User A ${currentUser.firstname}`);
    console.log(`User B Partner ${chat.partner.firstname}`);
    console.log(`User C Creator ${chat.creator.firstname}`);
    socket.broadcast.to(chat.partner._id).emit('chat:create', chat);
  });

  // Chat deleted
  socket.on('chat:delete', (chat: Chat) => {
    socket.broadcast.emit('chat:deleted', chat);
  });

  // User joined room
  socket.on('room:join', (room: Room) => {
    socket.join(room._id);
  });

  // User left room
  socket.on('room:leave', (room: Room) => {
    socket.leave(room._id);
  });

  // User sent message
  socket.on('message', ({ message }: { message: Message }) => {
    socket.to(message.channel._id).emit('message', message);
  });

  // Online Status changed
  socket.on(
    'status:change',
    ({ user, statusId }: { user: User; statusId: string }) => {
      console.log(`Change status of ${user.firstname} to ${statusId}`);
      socket.broadcast.emit('status:change', { user, statusId });
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
      currentChannel,
    }: {
      currentUser: User;
      currentChannel: Channel;
    }) => {
      socket.to(currentChannel._id).emit('user:typing', [currentUser]);
    }
  );
});
