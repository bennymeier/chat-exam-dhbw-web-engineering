import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { establishConnection, insertDemoData } from './db.connection';
import RoomRouter from './routers/room.router';
import UserRouter from './routers/user.router';
import MessageRouter from './routers/message.router';

const apiPort = 3001 || process.env.PORT;
const socketPort = 3002;

const app = express();
const socketServer = http.createServer(app);
const io = new Server(socketServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use('/api', [RoomRouter, UserRouter, MessageRouter]);

establishConnection();
// insertDemoData();
app.listen(apiPort, () => console.log('Server listening on port: ', apiPort));

socketServer.listen(socketPort, () =>
  console.log('Websockets listening on port: ', socketPort)
);

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log('MSG: ', msg);
  });
});
