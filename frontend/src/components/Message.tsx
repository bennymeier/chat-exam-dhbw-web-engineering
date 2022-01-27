import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';
import { MessageInterface, UserInterface } from '../types';

interface MessageProps {
  message: MessageInterface;
  currentUser: UserInterface;
}
const Message: React.FC<MessageProps> = (props) => {
  const { message, currentUser } = props;
  const { senderId } = message;
  const getUser = () => {
    // senderId as string
    if (typeof senderId === 'string') {
      return currentUser;
    } else {
      // senderId as UserInterface
      return senderId;
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

export default Message;
