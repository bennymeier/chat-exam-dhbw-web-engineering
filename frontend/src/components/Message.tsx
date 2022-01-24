import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';
import { MessageInterface, UserInterface } from '../types';

interface MessageProps {
  message: MessageInterface;
  participants: UserInterface[];
  currentUser: UserInterface;
}
const Message: React.FC<MessageProps> = (props) => {
  const { message, participants, currentUser } = props;
  const isMine = message.senderId === currentUser._id;
  const user = participants.find(
    (participant) => participant._id === message.senderId
  );

  return (
    <>
      <Flex
        m="0.5em"
        alignItems="center"
        gap="1em"
        flexDirection={isMine ? 'row' : 'row-reverse'}
      >
        <Box>
          <Avatar name={`${user?.firstname} ${user?.lastname}`} size="sm" />
        </Box>
        <Box
          bgColor={isMine ? 'gray.300' : 'teal.200'}
          p="1em"
          borderRadius="md"
          maxWidth="65%"
        >
          <Flex gap="0.7em">
            <Text fontSize="xs" fontWeight="bold">
              {user?.firstname} {user?.lastname}
            </Text>
            <Text
              fontSize="xs"
              title={new Date(message.createdAt).toLocaleString()}
            >
              {moment(message.createdAt).fromNow()}
            </Text>
          </Flex>
          <Text fontSize="sm">{message.content}</Text>
        </Box>
      </Flex>
    </>
  );
};

export default Message;
