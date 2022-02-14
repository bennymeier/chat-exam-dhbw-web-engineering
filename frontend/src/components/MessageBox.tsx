import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Flex, IconButton, Textarea } from '@chakra-ui/react';
import { FaTelegramPlane } from 'react-icons/fa';
import { Chat, CreateMessage, Message, Room, User } from '../types';
import MessageApi from '../api/message.api';
import { useSocket } from './SocketProvider';
import TypingUsers from './TypingUsers';
import useIsTyping from './TypingHook';
import { USER_TYPING } from '../socket.events';

interface MessageBoxProps {
  currentChannel: Room | Chat;
  currentUser: User;
  messageSentCallback: (message: Message) => void;
}
const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const { currentChannel, currentUser, messageSentCallback } = props;
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, register] = useIsTyping();
  const socket = useSocket();
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  useEffect(() => {
    if (isTyping) {
      socket.emit(USER_TYPING, { currentChannel, currentUser });
    }
    return () => {
      socket.off(USER_TYPING);
    };
  }, [socket, isTyping]);

  const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // on enter send message, if shit and enter is pressed don't send message
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    const data: CreateMessage = {
      sender: currentUser._id,
      channel: currentChannel._id,
      content: value,
    };
    try {
      setIsLoading(true);
      const res = await MessageApi.create(data);
      setIsLoading(false);
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
          onKeyDown={handleKeydown}
        />
        <IconButton
          isLoading={isLoading}
          disabled={!value}
          icon={<FaTelegramPlane />}
          aria-label="Send Message"
          onClick={sendMessage}
        />
      </Flex>
    </Box>
  );
};

export default MessageBox;
