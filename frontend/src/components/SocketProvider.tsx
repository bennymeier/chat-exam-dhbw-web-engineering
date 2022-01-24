import { createContext, useContext, useEffect, useState } from 'react';
import io, { type Socket } from 'socket.io-client';
import { SOCKET_URL } from '../api/api';
import { UserInterface } from '../types';

const defaultSocket = io(SOCKET_URL, { autoConnect: false });
export const SocketContext = createContext(defaultSocket);

interface SocketProviderProps {
  user: UserInterface;
}
export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  user,
}) => {
  const [socket, setSocket] = useState<Socket>(defaultSocket);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      autoConnect: false,
    });
    socket.auth = user;
    setSocket(socket);
    if (user?._id) {
      socket.connect();
    }
    return () => {
      socket.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
