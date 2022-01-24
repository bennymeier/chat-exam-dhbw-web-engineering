import { createContext, ReactChild } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../api/api';

const socket = io(SOCKET_URL);
export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: { children: ReactChild }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);
