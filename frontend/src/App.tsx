import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';
import { RoomInterface, UserInterface } from './types';
import RoomApi from './api/room.api';
import { SocketProvider } from './components/SocketProvider';
import { useToast } from '@chakra-ui/react';
import EmptyRoom from './components/EmptyRoom';

const App = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<RoomInterface>();
  const fetchRoomData = async (roomId: string) => {
    try {
      setIsLoading(true);
      const res = await RoomApi.get(roomId);
      setCurrentRoom(res.data);
      setIsLoading(false);
      setShowSuggestions(false);
      const isRoom = res.data?.isRoom;
      navigate(`/${isRoom ? 'room' : 'chat'}/${res.data._id}`);
    } catch (err) {
      toast({
        title: "Chat or Room couldn't be opened.",
        description:
          "We couldn't open the Chat or Room. Please contact the administrator.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.warn(err);
    }
  };
  useEffect(() => {
    if (id) {
      console.log('%cOpen conversation over URL..', 'color:green;');
      fetchRoomData(id);
    } else if (currentUser?.lastRoomId) {
      console.log(
        '%cOpen conversation over currentUser.lastRoomId.',
        'color:green;'
      );
      fetchRoomData(currentUser.lastRoomId);
    } else {
      console.log(
        '%cCannot open last conversation, so show create or join chat/room.',
        'color:orange;'
      );
      setShowSuggestions(true);
    }
  }, [id, currentUser]);

  return (
    <SocketProvider user={currentUser as UserInterface}>
      <Sidebar currentRoom={currentRoom}>
        {showSuggestions && <EmptyRoom />}
        {!showSuggestions && (
          <ChatView
            currentRoom={currentRoom as RoomInterface}
            currentUser={currentUser as UserInterface}
          />
        )}
      </Sidebar>
    </SocketProvider>
  );
};

export default App;
