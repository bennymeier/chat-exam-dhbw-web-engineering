import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';
import { RoomInterface } from './types';
import RoomApi from './api/room.api';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RoomInterface>();
  const { id: chatPartnerId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (chatPartnerId && user?._id) {
        setIsLoading(true);
        const res = await RoomApi.getByParticipants([user._id, chatPartnerId]);
        setCurrentRoom(res?.data?.room);
        setIsLoading(false);
        console.log(res);
      } else {
        console.warn('No IDs to chat with! Load last room of user!');
      }
    };
    fetchData();
  }, [chatPartnerId]);

  return (
    <Sidebar currentRoom={currentRoom}>
      <ChatView currentRoom={currentRoom} />
    </Sidebar>
  );
};

export default App;
