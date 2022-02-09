import { DeleteIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import moment from 'moment';
import { Message, User } from '../types';
import { FaEllipsisH } from 'react-icons/fa';

interface MessageProps {
  message: Message;
  currentUser: User;
  onDelete: (message: Message) => void;
}
const MessageComponent: React.FC<MessageProps> = (props) => {
  const { message, currentUser, onDelete } = props;
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
  const getDate = () => {
    const isToday = moment(message.createdAt).isSame(new Date(), 'day');
    if (!isToday) {
      return new Date(message.createdAt).toLocaleString();
    }
    return moment(message.createdAt).fromNow();
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
          paddingX="1em"
          paddingY="0.5em"
          borderRadius="md"
          maxWidth="65%"
        >
          <Flex gap="0.7em" alignItems="center">
            <Text fontSize="xs" fontWeight="bold">
              {fullname}
            </Text>
            <Tooltip
              label={`${new Date(message.createdAt).toLocaleString()}`}
              aria-label={`Message written at ${new Date(
                message.createdAt
              ).toLocaleString()}`}
            >
              <Text fontSize="xs">{getDate()}</Text>
            </Tooltip>
            {isMine && (
              <Box marginLeft="auto">
                <Menu>
                  <MenuButton
                    display="inline-flex"
                    as={IconButton}
                    aria-label="Options"
                    icon={<FaEllipsisH />}
                    variant="unstyled"
                    size="xs"
                  />
                  <MenuList padding="unset" minWidth="unset">
                    <MenuItem
                      icon={<DeleteIcon />}
                      onClick={() => onDelete(message)}
                    >
                      Delete Message
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            )}
          </Flex>
          <Text fontSize="sm">{message.content}</Text>
        </Box>
      </Flex>
    </>
  );
};

export default MessageComponent;
