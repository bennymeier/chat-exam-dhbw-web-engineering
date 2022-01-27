import { Flex, SkeletonCircle, Skeleton, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoomInterface, StatusInterface, UserInterface } from '../types';
import { useAuth } from './AuthProvider';
import RoomApi from '../api/room.api';
import { useSocket } from './SocketProvider';
import User from './User';
import Room from './Room';
import SmallSidebar from './SmallSidebar';

const ConversationList = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const { id: conversationId } = useParams();
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [chats, setChats] = useState<RoomInterface[]>([]);
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [activeMenu, setActiveMenu] = useState('Rooms');

  useEffect(() => {
    socket.on(
      'status:change',
      ({ user, status }: { user: UserInterface; status: StatusInterface }) => {
        // const allUsers = users.map((userObj) => {
        //   if (userObj._id === user._id) {
        //     return { ...userObj, status: status.id };
        //   }
        //   return userObj;
        // });
        // setUsers(allUsers);
        // console.log(
        //   `${user.firstname} ${user.lastname} changed his status to ${status.text}`
        // );
      }
    );
    return () => {
      socket.off('status:change');
    };
  }, [socket, chats]);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await RoomApi.getAll(
          undefined,
          false,
          (currentUser as UserInterface)._id
        );
        const checkMenu: RoomInterface = res.data.find(
          (conversation: RoomInterface) => conversation._id === conversationId
        );
        if (checkMenu?.isRoom) {
          setActiveMenu('Rooms');
        } else {
          setActiveMenu('Chats');
        }
        const rooms = res.data.filter((room: RoomInterface) => room.isRoom);
        setRooms(rooms);
        const chats = res.data.filter((chat: RoomInterface) => !chat.isRoom);
        setChats(chats);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [conversationId]);

  if (isError) return <Box>Fetching users went wrong.</Box>;

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

  const handleRoomClick = (room: RoomInterface) => {
    navigate(`/room/${room._id}`, { replace: true });
  };

  const handleUserClick = (user: UserInterface, room?: RoomInterface) => {
    if (room) {
      navigate(`/chat/${room._id}`, { replace: true });
    }
  };
  const handleSidebarClick = (activeMenu: string) => {
    setActiveMenu(activeMenu);
  };

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
      <Box width="100%" bgColor="gray.300">
        {activeMenu === 'Rooms' &&
          rooms.map((room) => (
            <Room
              room={room}
              key={room._id}
              onClick={handleRoomClick}
              activeId={conversationId as string}
            />
          ))}
        {activeMenu === 'Chats' &&
          chats.map((chat) => {
            const user = chat.participants.find(
              (participant) => participant._id !== currentUser?._id
            );
            return (
              <User
                room={chat}
                user={user as UserInterface}
                key={chat._id}
                onClick={handleUserClick}
                activeId={conversationId as string}
              />
            );
          })}
      </Box>
    </Flex>
  );
};

export default ConversationList;
