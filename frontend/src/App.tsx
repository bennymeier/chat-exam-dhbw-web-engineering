import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';
import { RoomInterface, UserInterface } from './types';
import RoomApi from './api/room.api';
import { SocketProvider } from './components/SocketProvider';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RoomInterface>();
  const { id: chatPartnerId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchRoomData = async () => {
      if (chatPartnerId && user?._id) {
        setIsLoading(true);
        const res = await RoomApi.getByParticipants([user._id, chatPartnerId]);
        setCurrentRoom(res?.data?.room);
        setIsLoading(false);
      } else {
        console.warn('No IDs to chat with! Load last room of user!');
      }
    };
    fetchRoomData();
  }, [chatPartnerId, user?._id]);

  return (
    <SocketProvider user={user as UserInterface}>
      <Sidebar currentRoom={currentRoom}>
        <ChatView
          currentRoom={currentRoom as RoomInterface}
          currentUser={user as UserInterface}
        />
      </Sidebar>
    </SocketProvider>
  );
};

export default App;
