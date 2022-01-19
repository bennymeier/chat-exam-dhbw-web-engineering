import express from 'express';
import cors from 'cors';
import { establishConnection } from './db.connection';
import RoomRouter from './routers/room.router';
import UserRouter from './routers/user.router';
import MessageRouter from './routers/message.router';

const port = 3000 || process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', [RoomRouter, UserRouter, MessageRouter]);

establishConnection();
app.listen(port, () => console.log('Server listening on port: ', port));
