import express from 'express';
import cors from 'cors';
import { establishMongoDBConnection } from './db.connection';
import RoomRouter from './routers/room.router';
import ChatRouter from './routers/chat.router';
import UserRouter from './routers/user.router';
import MessageRouter from './routers/message.router';
import { establishSocketConnection } from './socket.connection';
import { Room, Message, User, Chat, Channel } from './types';
import {
  AVATAR_CHANGE,
  CHAT_CREATE,
  CHAT_DELETE,
  CHAT_JOIN,
  CHAT_LEAVE,
  MESSAGE_DELETE,
  MESSAGE_RECEIVE,
  ROOM_CREATE,
  ROOM_DELETE,
  ROOM_JOIN,
  ROOM_LEAVE,
  STATUS_CHANGE,
  USER_TYPING,
} from './socket.events';

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

let connectedUsers: any = {};

io.on('connection', (socket) => {
  const currentUser = socket.handshake.auth;
  connectedUsers[currentUser._id] = socket.handshake.auth;

  // Users goes offline (closes tab)
  socket.on('disconnect', () => {
    delete connectedUsers[currentUser._id];
  });

  // Room created
  socket.on(ROOM_CREATE, (room: Room) => {
    socket.broadcast.emit(ROOM_CREATE, room);
  });

  // Room deleted
  socket.on(ROOM_DELETE, (room: Room) => {
    socket.broadcast.emit(ROOM_DELETE, room);
  });

  // Chat created
  socket.on(CHAT_CREATE, (chat: Chat) => {
    console.log('Chat ', chat);
    console.log(`User A ${currentUser.firstname}`);
    console.log(`User B Partner ${chat.partner.firstname}`);
    console.log(`User C Creator ${chat.creator.firstname}`);
    socket.broadcast.to(chat.partner._id).emit(CHAT_CREATE, chat);
  });

  // Chat deleted
  socket.on(CHAT_DELETE, (chat: Chat) => {
    socket.broadcast.emit(CHAT_DELETE, chat);
  });

  // User joined room
  socket.on(ROOM_JOIN, (room: Room) => {
    console.log(`Join room with ID ${room._id}.`);
    socket.join(room._id);
  });

  // User left room
  socket.on(ROOM_LEAVE, (room: Room) => {
    console.log('Leave room.');
    socket.leave(room._id);
  });

  // User joined chat
  socket.on(CHAT_JOIN, (chat: Chat) => {
    // FIXME: Sometimes chat._id is undefined
    if (chat?._id) {
      console.log(`Join chat with ID ${chat._id}.`);
      socket.join(chat._id);
    }
  });

  // User left chat
  socket.on(CHAT_LEAVE, (chat: Chat) => {
    console.log('Leave chat.');
    socket.leave(chat._id);
  });

  // User sent message
  socket.on(MESSAGE_RECEIVE, ({ message }: { message: Message }) => {
    console.log(message);
    console.log(`Message received to channel with ID ${message.channel._id}.`);
    socket.to(message.channel._id).emit(MESSAGE_RECEIVE, message);
  });

  // User deleted message
  socket.on(MESSAGE_DELETE, ({ message }: { message: any }) => {
    console.log(`Message with ID ${message._id} deleted.`);
    socket.to(message.channel._id).emit(MESSAGE_DELETE, message);
  });

  // Online Status changed
  socket.on(
    STATUS_CHANGE,
    ({ user, statusId }: { user: User; statusId: string }) => {
      console.log(`Change status of ${user.firstname} to ${statusId}.`);
      socket.broadcast.emit(STATUS_CHANGE, { user, statusId });
    }
  );

  // Avatar changed
  socket.on(AVATAR_CHANGE, () => {
    console.log('Someone changed his avatar.');
  });

  // User is typing
  socket.on(
    USER_TYPING,
    ({
      currentUser,
      currentChannel,
    }: {
      currentUser: User;
      currentChannel: Channel;
    }) => {
      socket.to(currentChannel._id).emit(USER_TYPING, [currentUser]);
    }
  );
});
