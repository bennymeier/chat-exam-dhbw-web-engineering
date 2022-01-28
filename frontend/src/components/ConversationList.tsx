import { Flex, SkeletonCircle, Skeleton, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChannelType, Chat, Room, User } from '../types';
import { useAuth } from './AuthProvider';
import RoomApi from '../api/room.api';
import ChatApi from '../api/chat.api';
import { useSocket } from './SocketProvider';
import ChatComponent from './Chat';
import RoomComponent from './Room';
import SmallSidebar from './SmallSidebar';

const ConversationList = () => {
  const socket = useSocket();
  const { id: conversationId } = useParams();
  const currentUser = useAuth().user as User;
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeMenu, setActiveMenu] = useState<ChannelType>(
    currentUser.lastChannelType
  );
  const handleSidebarClick = (activeMenu: ChannelType) => {
    setActiveMenu(activeMenu);
  };

  useEffect(() => {
    socket.on('chat:create', (chat: Chat) => {
      setChats((prevChats) => [chat, ...prevChats]);
    });
    return () => {
      socket.off('status:change');
      socket.off('chat:create');
    };
  }, [socket, chats]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const allRooms = await RoomApi.getCurrentUserRooms(currentUser._id);
        setRooms(allRooms.data);
        const allChats = await ChatApi.getCurrentUserChats(currentUser._id);
        setChats(allChats.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    // TODO: without activeMenu it re renders perfectly, but the user status gets the old if u change to rooms and back
  }, [conversationId]);

  if (isLoading)
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <Flex key={index} p="4" mx="4" alignItems="center">
            <SkeletonCircle size="10" mr="4" />
            <Skeleton height="15" width="100px" />
          </Flex>
        ))}
      </>
    );

  return (
    <Flex
      overflowY="auto"
      overflowX="hidden"
      height="100%"
      backgroundColor="white"
      css={{
        '&::-webkit-scrollbar': {
          width: '7px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: '4px',
        },
      }}
    >
      <SmallSidebar onClick={handleSidebarClick} activeMenu={activeMenu} />
      <Box width="calc(100% - 4rem)" bgColor="gray.300">
        {activeMenu === 'room' &&
          rooms.map((room) => (
            <RoomComponent
              currentUser={currentUser}
              room={room}
              key={room._id}
              activeId={conversationId as string}
            />
          ))}
        {activeMenu === 'chat' &&
          chats.map((chat) => {
            return (
              <ChatComponent
                currentUser={currentUser}
                chat={chat}
                key={chat._id}
                activeChannelId={conversationId as string}
              />
            );
          })}
      </Box>
    </Flex>
  );
};

export default ConversationList;
