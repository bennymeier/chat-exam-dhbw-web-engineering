import { Box, Flex, IconButton, Divider } from '@chakra-ui/react';
import MessageBox from './MessageBox';
import { FaTelegramPlane } from 'react-icons/fa';
import Message from './Message';

const MESSAGES = [
  {
    text: 'lorem ipsum dolor sit atmet lorem sit atmet dolor sit atmet lol ripsum dolor',
    sender: 'Benjamin Meier',
    createdAt: new Date(),
    isMine: true,
  },
  {
    text: 'lorem ipsum dolor sit atmet',
    sender: 'Benjamin Meier',
    createdAt: new Date(),
    isMine: true,
  },
  {
    text: 'lorem ipsum dolor sit atmet atmet lorem sit atmet dolor sit atmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sit',
    sender: 'Benjamin Meier',
    createdAt: new Date(),
    isMine: false,
  },
  {
    text: 'lorem ipsum dolor sit atmet',
    sender: 'Benjamin Meier',
    createdAt: new Date(),
    isMine: false,
  },
  {
    text: 'lorem ipsum dolor sit atmet atmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sit',
    sender: 'Benjamin Meier',
    createdAt: new Date(),
    isMine: true,
  },
  {
    text: 'lorem ipsum dolor sit atmet atmet lorem sit atmet dolor sit',
    sender: 'Benjamin Meier',
    createdAt: new Date(),
    isMine: true,
  },
  {
    text: 'lorem ipsum dolor sit atmet',
    sender: 'Benjamin Meier',
    createdAt: new Date(),
    isMine: false,
  },
  {
    text: 'lorem ipsum dolor sit atmetatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sitatmet lorem sit atmet dolor sit',
    sender: 'Benjamin Meier',
    createdAt: new Date(),
    isMine: true,
  },
  {
    text: 'lorem ipsum dolor sit atmet',
    sender: 'Benjamin Meier',
    createdAt: new Date(),
    isMine: false,
  },
];
const ChatView = () => {
  return (
    <>
      <Flex flexDirection="column">
        <Box height="65vh" overflowY="auto">
          {MESSAGES.map((message, index) => (
            <Message key={index} message={message} isMine={message.isMine} />
          ))}
        </Box>
        <Divider borderBottomWidth="3px" mb="1em" />
        <Box>
          <Flex alignItems="center" gap="1em">
            <MessageBox />
            <IconButton icon={<FaTelegramPlane />} aria-label="Send Message" />
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default ChatView;
