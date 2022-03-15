import { Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat, User } from '../types';
import Status from './Status';
import UserApi from '../api/user.api';
import { useSocket } from './SocketProvider';
import { STATUS_CHANGE } from '../socket.events';

interface ChatProps {
  chat: Chat;
  activeChannelId: string;
  currentUser: User;
}
const ChatComponent: React.FC<ChatProps> = (props) => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { chat, activeChannelId, currentUser } = props;
  const [user, setUser] = useState<User>(chat.partner);
  const isCurrentChannel = chat && chat._id === activeChannelId;
  const handleClick = async () => {
    await UserApi.update(
      { lastChannelType: 'chat', lastChannel: chat._id },
      currentUser._id
    );
    navigate(`/chat/${chat._id}`, { replace: true });
  };

  useEffect(() => {
    if (chat.partner._id === currentUser._id) {
      setUser(chat.creator);
    } else {
      setUser(chat.partner);
    }
  }, []);

  useEffect(() => {
    socket.on(STATUS_CHANGE, (data: { user: User; statusId: string }) => {
      console.log(
        'STATUS CHANGE! ',
        data.user.firstname + ' ' + data.user.lastname + ' curr: ',
        user.firstname + ' ' + user.lastname
      );
      if (data.user._id === user._id) {
        const userObj = { ...user, status: data.statusId };
        setUser(userObj);
      }
    });
  }, [socket, user]);

  return (
    <Flex
      userSelect="none"
      align="center"
      padding="2"
      role="group"
      cursor="pointer"
      bg={isCurrentChannel ? 'teal.500' : ''}
      color={isCurrentChannel ? 'white' : ''}
      _hover={{
        bg: 'teal.500',
        color: 'white',
      }}
      textAlign="left"
      onClick={handleClick}
    >
      <Status user={user} />
      <Flex flexDirection="column" alignItems="baseline" width="100%">
        <Heading size="xs" isTruncated width="95%">
          {user.firstname} {user.lastname}
        </Heading>
        <Text fontSize="xs" isTruncated width="70%">
          {chat?.lastMessage?.content}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ChatComponent;
