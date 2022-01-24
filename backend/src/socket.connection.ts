import http from 'http';
import { type Express } from 'express';
import { Server } from 'socket.io';
7;
const socketPort = 3002;
/**
 * Establish socket.io connection.
 */
export const establishSocketConnection = (app: Express) => {
  const socketServer = http.createServer(app);
  const server = new Server(socketServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
  socketServer.listen(socketPort, () =>
    console.log(`Websockets running on port: ${socketPort}`)
  );
  return server;
};
