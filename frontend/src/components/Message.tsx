import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';

export interface MessageProps {
  roomId: string;
  userId: string;
  messageBody: string;
  isDeleted: boolean;
}
const Message = (props: any) => {
  const { sender, text, createdAt, isMine } = props.message;

  return (
    <>
      <Flex
        m="0.5em"
        alignItems="center"
        gap="1em"
        flexDirection={isMine ? 'row' : 'row-reverse'}
      >
        <Box>
          <Avatar name={sender} size="sm" />
        </Box>
        <Box
          bgColor={isMine ? 'gray.300' : 'teal.200'}
          p="1em"
          borderRadius="md"
          maxWidth="65%"
        >
          <Flex gap="0.7em">
            <Text fontSize="xs" fontWeight="bold">
              {sender}
            </Text>
            <Text fontSize="xs" title={new Date(createdAt).toLocaleString()}>
              {moment(createdAt).fromNow()}
            </Text>
          </Flex>
          <Text fontSize="sm">{text}</Text>
        </Box>
      </Flex>
    </>
  );
};

export default Message;
