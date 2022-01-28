import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Flex, IconButton, Textarea } from '@chakra-ui/react';
import { FaTelegramPlane } from 'react-icons/fa';
import { Chat, CreateMessage, Message, Room, User } from '../types';
import MessageApi from '../api/message.api';
import { useSocket } from './SocketProvider';
import TypingUsers from './TypingUsers';
import useIsTyping from './TypingHook';

interface MessageBoxProps {
  currentChannel: Room | Chat;
  currentUser: User;
  messageSentCallback: (message: Message) => void;
}
const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const { currentChannel, currentUser, messageSentCallback } = props;
  const [value, setValue] = useState('');
  const [isTyping, register] = useIsTyping();
  const socket = useSocket();
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  useEffect(() => {
    if (isTyping) {
      console.log('User is still typing.');
      socket.emit('user:typing', { currentChannel, currentUser });
    } else {
      console.log('User stopped typing.');
    }
  }, [isTyping]);

  const sendMessage = async () => {
    const data: CreateMessage = {
      sender: currentUser._id,
      channel: currentChannel._id,
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

  return (
    <Box>
      <Box height="24px">
        <TypingUsers />
      </Box>
      <Flex alignItems="center" gap="1em">
        <Textarea
          ref={register}
          value={value}
          onChange={handleChange}
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
