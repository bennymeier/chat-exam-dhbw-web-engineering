import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';
import { Chat, Room, User } from './types';
import RoomApi from './api/room.api';
import ChatApi from './api/chat.api';
import UserApi from './api/user.api';
import { SocketProvider } from './components/SocketProvider';
import { useToast } from '@chakra-ui/react';
import EmptyChannel from './components/EmptyChannel';

const App = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id: urlChannelId } = useParams();
  const auth = useAuth();
  const currentUser = auth.user as User;
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Room | Chat>();
  const fetchChannel = async (channelId: string) => {
    try {
      setIsLoading(true);
      const user = await UserApi.get(currentUser._id);
      const isRoom = user.data.lastChannelType === 'room';
      const res = isRoom
        ? await RoomApi.get(channelId)
        : await ChatApi.get(channelId);
      setCurrentChannel(res.data);
      setIsLoading(false);
      setShowSuggestions(false);
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
      console.error(err);
    }
  };
  useEffect(() => {
    if (urlChannelId) {
      console.log('%cOpen conversation over URL..', 'color:green;');
      fetchChannel(urlChannelId);
    } else if (currentUser?.lastChannel) {
      console.log(
        '%cOpen conversation over currentUser.lastChannel.',
        'color:green;'
      );
      fetchChannel(currentUser.lastChannel);
    } else {
      console.log(
        '%cCannot open last conversation, so show create or join chat/room.',
        'color:orange;'
      );
      setShowSuggestions(true);
    }
  }, [urlChannelId, currentUser]);

  return (
    <SocketProvider user={currentUser}>
      <Sidebar currentChannel={currentChannel}>
        {showSuggestions && <EmptyChannel />}
        {!showSuggestions && (
          <ChatView
            currentChannel={currentChannel as Room & Chat}
            currentUser={currentUser}
          />
        )}
      </Sidebar>
    </SocketProvider>
  );
};

export default App;
