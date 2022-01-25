import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Flex, IconButton, Textarea, Text } from '@chakra-ui/react';
import { FaTelegramPlane } from 'react-icons/fa';
import { MessageInterface, RoomInterface, UserInterface } from '../types';
import MessageApi from '../api/message.api';
import { useSocket } from './SocketProvider';

interface MessageBoxProps {
  currentRoom: RoomInterface;
  currentUser: UserInterface;
  messageSentCallback: (message: MessageInterface) => void;
}
const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const { currentRoom, currentUser, messageSentCallback } = props;
  const [value, setValue] = useState('');
  const [typingUsers, setTypingUsers] = useState<UserInterface[]>([]);
  const socket = useSocket();
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  let timeout: any;
  const timeoutFunction = () => {
    setTypingUsers([]);
  };
  const handleKeyUpListener = () => {
    socket.emit('user:typing', { currentRoom, currentUser });
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 2000);
  };
  const sendMessage = async () => {
    const data: Partial<MessageInterface> = {
      senderId: currentUser._id,
      roomId: currentRoom._id,
      content: value,
    };
    try {
      const res = await MessageApi.create(data);
      setValue('');
      messageSentCallback(res.data);
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    socket.on('user:typing', (typingUsers: UserInterface[]) => {
      setTypingUsers(typingUsers);
    });
    return () => {
      socket.off('user:typing');
    };
  }, [socket]);

  return (
    <Box>
      <Box>
        {typingUsers.map((typingUser) => (
          <Text key={typingUser._id}>
            {typingUser.firstname} {typingUser.lastname}
          </Text>
        ))}
      </Box>
      <Flex alignItems="center" gap="1em">
        <Textarea
          value={value}
          onKeyUp={handleKeyUpListener}
          onChange={handleInputChange}
          placeholder="Enter a new message"
          size="sm"
        />
        <IconButton
          icon={<FaTelegramPlane />}
          aria-label="Send Message"
          onClick={sendMessage}
        />
      </Flex>
    </Box>
  );
};

export default MessageBox;
