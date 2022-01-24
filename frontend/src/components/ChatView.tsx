import { Box, Flex, Divider } from '@chakra-ui/react';
import MessageBox from './MessageBox';
import Message from './Message';
import { MessageInterface, RoomInterface, UserInterface } from '../types';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageApi from '../api/message.api';
import UserApi from '../api/user.api';
import EmptyRoom from './EmptyRoom';

interface ChatViewProps {
  currentRoom: RoomInterface;
  currentUser: UserInterface;
}
const ChatView: React.FC<ChatViewProps> = (props) => {
  const { currentRoom, currentUser } = props;
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [participants, setParticipants] = useState<UserInterface[]>([]);
  const [participantsLoading, setParticipantsLoading] = useState(true);
  const { id: chatPartnerId } = useParams();
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
  const handleNewMessage = (message: MessageInterface) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await MessageApi.getMessagesByRoomId(currentRoom._id);
        setMessages(res.data);
      } catch (err) {
        console.warn(err);
      }
    };
    // Maybe check if all messages has loaded
    // Maybe check if the user already scrolled, so turn it off
    fetchMessages();
  }, [chatPartnerId, currentRoom?._id]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setParticipantsLoading(true);
        const res = await UserApi.getByParticipants(currentRoom.participants);
        setParticipants(res.data);
        setParticipantsLoading(false);
      } catch (err) {
        console.warn(err);
      }
    };
    if (!!currentRoom?.participants?.length) {
      fetchParticipants();
    }
  }, [currentRoom?.participants]);

  useEffect(() => {
    setTimeout(() => scrollToBottom(), 50);
  }, [messages]);

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
          {!!!messages.length && <EmptyRoom />}
          {!participantsLoading &&
            messages.map((message) => (
              <Message
                key={message._id}
                message={message}
                participants={participants}
                currentUser={currentUser}
              />
            ))}
        </Box>
        <Divider borderBottomWidth="3px" mb="1em" />
        <Box>
          <MessageBox
            currentRoom={currentRoom}
            currentUser={currentUser}
            messageSentCallback={handleNewMessage}
          />
        </Box>
      </Flex>
    </>
  );
};

export default ChatView;
