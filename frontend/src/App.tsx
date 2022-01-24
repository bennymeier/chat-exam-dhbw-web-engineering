import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';
import { RoomInterface, UserInterface } from './types';
import RoomApi from './api/room.api';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RoomInterface>();
  const [currentUser, setCurrentUser] = useState<UserInterface>();
  const { id: chatPartnerId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchRoomData = async () => {
      if (chatPartnerId && user?._id) {
        setIsLoading(true);
        const res = await RoomApi.getByParticipants([user._id, chatPartnerId]);
        setCurrentRoom(res?.data?.room);
        setCurrentUser(user);
        setIsLoading(false);
      } else {
        console.warn('No IDs to chat with! Load last room of user!');
      }
    };
    fetchRoomData();
  }, [chatPartnerId, user?._id]);

  return (
    <Sidebar currentRoom={currentRoom}>
      <ChatView
        currentRoom={currentRoom as RoomInterface}
        currentUser={currentUser as UserInterface}
      />
    </Sidebar>
  );
};

export default App;
