import { ReactNode, useState, useEffect } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { FiMenu, FiBell, FiChevronDown, FiEdit } from 'react-icons/fi';
import authProvider from '../auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useSocket } from './SocketProvider';
import { allStatus, Room, Chat, User } from '../types';
import UserApi from '../api/user.api';
import StatusComponent from './Status';
import ChannelList from './ChannelList';
import ChannelSuggestions from './ChannelSuggestions';
import {
  CHAT_JOIN,
  ROOM_JOIN,
  ROOM_LEAVE,
  STATUS_CHANGE,
} from '../socket.events';

interface SidebarProps {
  children: ReactNode;
  currentChannel?: Room | Chat;
}

const Sidebar = ({ children, ...props }: SidebarProps) => {
  const { currentChannel } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socket = useSocket();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('%cSocket connected.', 'color:green;');
    });
    socket.on('disconnect', () => {
      console.log('%cSocket disconnected.', 'color:red;');
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if ((currentChannel as Room)?.participants) {
      socket.emit(ROOM_JOIN, currentChannel);
    } else {
      socket.emit(CHAT_JOIN, currentChannel);
    }
    return () => {
      socket.off(ROOM_JOIN);
      socket.off(ROOM_LEAVE);
    };
  }, [currentChannel]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Navbar onOpen={onOpen} currentChannel={currentChannel} />
      <Box ml={{ base: 0, md: 80 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}
const SidebarContent = ({ onClose, ...props }: SidebarContentProps) => {
  const { isOpen, onOpen, onClose: onCloseSuggestionModal } = useDisclosure();

  return (
    <>
      <ChannelSuggestions
        isOpen={isOpen}
        onClose={onCloseSuggestionModal}
        onOpen={onOpen}
      />
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        width={{ base: 'full', md: 80 }}
        pos="fixed"
        height="100%"
        {...props}
      >
        <Flex h="20" alignItems="center" mx="2" justifyContent="space-between">
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            userSelect="none"
          >
            DHBW L??rrach Chat
          </Text>
          <IconButton
            icon={<FiEdit />}
            aria-label="Start a new conversation"
            size="sm"
            onClick={onOpen}
          />
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        <ChannelList />
      </Box>
    </>
  );
};

interface NavbarProps extends FlexProps {
  onOpen: () => void;
  currentChannel?: Chat | Room;
}
const Navbar = ({ onOpen, ...props }: NavbarProps) => {
  const { currentChannel } = props;
  const { isOpen, onOpen: onEditProfileOpen, onClose } = useDisclosure();
  const auth = useAuth();
  const [user, setUser] = useState<User>(auth.user as User);
  const navigate = useNavigate();
  const socket = useSocket();
  const handleSignOut = () => {
    authProvider.signout();
    navigate('/');
  };
  const handleStatusChange = async (statusId: string) => {
    const userObj = { ...user, status: statusId };
    try {
      await UserApi.update(userObj, user._id);
      socket.emit(STATUS_CHANGE, { user, statusId });
      setUser(userObj);
    } catch (err) {
      console.warn(err);
    }
  };
  const getChannelName = () => {
    if (currentChannel?.name) {
      return currentChannel.name;
      // @ts-ignore
    } else if (currentChannel?.partner) {
      // @ts-ignore
      const { partner } = currentChannel;
      // @ts-ignore
      const { firstname, lastname } = partner;
      return `${firstname} ${lastname}`;
    }
  };

  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
      >
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          userSelect="none"
        >
          DHBW L??rrach Chat
        </Text>

        <HStack spacing={{ base: '0', md: '6' }}>
          <Heading size="md" userSelect="none">
            {getChannelName()}
          </Heading>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <StatusComponent user={user} />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{`${user.firstname} ${user.lastname}`}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {user.mail}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <MenuItem onClick={onEditProfileOpen}>Edit Profile</MenuItem>
                <MenuDivider />
                {allStatus.map((status) => (
                  <MenuItem
                    key={status.id}
                    onClick={() => handleStatusChange(status.id)}
                  >
                    <Flex alignItems="center" gap="0.5em">
                      <Box
                        bgColor={status.bgColor}
                        borderRadius="50%"
                        width="16px"
                        height="16px"
                      />{' '}
                      {status.text}
                    </Flex>
                  </MenuItem>
                ))}
                <MenuDivider />
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Box>
                <Avatar
                  size="xl"
                  src={user.avatar}
                  name={`${user.firstname} ${user.lastname}`}
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
                <FormControl id="username" isRequired>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    // onChange={handleChange}
                    value={user.username}
                  />
                </FormControl>
              </Box>
              <HStack>
                <Box>
                  <FormControl id="firstname" isRequired>
                    <FormLabel htmlFor="firstname">First Name</FormLabel>
                    <Input
                      type="text"
                      name="firstname"
                      // onChange={handleChange}
                      value={user.firstname}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastname" isRequired>
                    <FormLabel htmlFor="lastname">Last Name</FormLabel>
                    <Input
                      type="text"
                      name="lastname"
                      // onChange={handleChange}
                      value={user.lastname}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="mail" isRequired>
                <FormLabel htmlFor="mail">Email address</FormLabel>
                <Input
                  type="email"
                  name="mail"
                  // onChange={handleChange}
                  value={user.mail}
                />
              </FormControl>
              <FormControl id="avatar">
                <FormLabel htmlFor="avatar">Avatar</FormLabel>
                <Input
                  type="file"
                  name="avatar"
                  // onChange={handleFileRead}
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sidebar;
