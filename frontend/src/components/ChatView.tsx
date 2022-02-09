import { Box, Flex, Divider, useToast } from '@chakra-ui/react';
import MessageBox from './MessageBox';
import MessageComponent from './Message';
import { Chat, Message, Room, User } from '../types';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageApi from '../api/message.api';
import { useSocket } from './SocketProvider';

interface ChatViewProps {
  currentChannel: Room | Chat;
  currentUser: User;
}
const ChatView: React.FC<ChatViewProps> = (props) => {
  const { currentChannel, currentUser } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const { id: chatPartnerId } = useParams();
  const toast = useToast();
  const socket = useSocket();
  const messagesContainer = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesContainer?.current) {
      const shouldScroll =
        messagesContainer.current.scrollTop +
          messagesContainer.current.clientHeight ===
        messagesContainer.current.scrollHeight;
      if (!shouldScroll) {
        messagesContainer.current.scrollTop =
          messagesContainer.current.scrollHeight;
      }
    }
  };
  const handleDeleteMessage = async (message: Message) => {
    try {
      await MessageApi.delete(message._id);
      const filterMessage = messages.filter((msg) => msg._id !== message._id);
      setMessages(filterMessage);
    } catch (err) {
      console.error(err);
      toast({
        title: "Message couldn't be deleted.",
        description: 'Please inform an administrator.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleNewMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    socket.emit('message', {
      message,
    });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await MessageApi.getMessagesByChannelId(currentChannel._id);
        setMessages(res.data);
      } catch (err) {
        console.warn(err);
      }
    };
    if (currentChannel?._id) {
      fetchMessages();
    }
  }, [chatPartnerId, currentChannel?._id]);

  useEffect(() => {
    setTimeout(() => scrollToBottom(), 50);
  }, [messages]);

  useEffect(() => {
    socket.on('message', (message: Message) => {
      console.log('NEW MSG: ', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off('message');
    };
  }, [socket]);

  return (
    <>
      <Flex flexDirection="column">
        <Box
          height="65vh"
          overflowY="auto"
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
          ref={messagesContainer}
        >
          {messages.map((message) => (
            <MessageComponent
              onDelete={handleDeleteMessage}
              key={message._id}
              message={message}
              currentUser={currentUser}
            />
          ))}
        </Box>
        <Divider borderBottomWidth="3px" />
        <Box>
          <MessageBox
            currentChannel={currentChannel}
            currentUser={currentUser}
            messageSentCallback={handleNewMessage}
          />
        </Box>
      </Flex>
    </>
  );
};

export default ChatView;
