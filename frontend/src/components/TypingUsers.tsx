import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { USER_TYPING } from '../socket.events';
import { User } from '../types';
import { useSocket } from './SocketProvider';

interface TypingUsersProps {
  isTyping?: boolean;
}
const TypingUsers: React.FC<TypingUsersProps> = ({ isTyping }) => {
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on(USER_TYPING, (typingUsers: User[]) => {
      setTypingUsers(typingUsers);
      // TODO: Does also reset if the user is still typing
      setTimeout(() => setTypingUsers([]), 1000);
    });
    return () => {
      socket.off(USER_TYPING);
    };
  }, [socket]);

  if (!!!typingUsers.length) {
    return null;
  }
  return (
    <Flex gap="0.3em" alignItems="center">
      <Box>
        <Box as="span" className="dot" />
        <Box as="span" className="dot" />
        <Box as="span" className="dot" />
      </Box>
      {typingUsers.length < 4 &&
        typingUsers.map((typingUser, index) => {
          const isLastUser = typingUsers.length - 1 === index;
          return (
            <Text key={typingUser._id} fontSize="xs" fontWeight="bold">
              {typingUser.firstname} {typingUser.lastname}
              {isLastUser ? '' : ','}
            </Text>
          );
        })}
      {typingUsers.length >= 4 && (
        <Text fontSize="xs" fontWeight="bold">
          Several people are typing.
        </Text>
      )}
      <Text fontSize="xs">
        {typingUsers.length > 1 ? 'are typing.' : 'is typing.'}
      </Text>
    </Flex>
  );
};

export default TypingUsers;
