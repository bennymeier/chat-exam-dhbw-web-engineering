import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';
import { Message, User } from '../types';

interface MessageProps {
  message: Message;
  currentUser: User;
}
const MessageComponent: React.FC<MessageProps> = (props) => {
  const { message, currentUser } = props;
  const { sender } = message;
  const getUser = () => {
    // sender as string
    if (typeof sender === 'string') {
      return currentUser;
    } else {
      // sender as User
      return sender;
    }
  };
  const isMine = getUser()._id === currentUser._id;
  const fullname = `${getUser().firstname} ${getUser().lastname}`;
  return (
    <>
      <Flex
        m="0.5em"
        alignItems="center"
        gap="1em"
        flexDirection={isMine ? 'row' : 'row-reverse'}
      >
        <Box>
          <Avatar name={fullname} size="sm" src={getUser()?.avatar} />
        </Box>
        <Box
          bgColor={isMine ? 'gray.300' : 'teal.200'}
          p="1em"
          borderRadius="md"
          maxWidth="65%"
        >
          <Flex gap="0.7em">
            <Text fontSize="xs" fontWeight="bold">
              {fullname}
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

export default MessageComponent;
