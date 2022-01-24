import { ReactNode, useEffect, useState } from 'react';
import {
  IconButton,
  Avatar,
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
  AvatarBadge,
  Heading,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import authProvider from '../auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import UserList from './UserList';
import { RoomInterface, UserInterface } from '../types';
import UserApi from '../api/user.api';

interface SidebarProps {
  children: ReactNode;
  currentRoom?: RoomInterface;
}

const Sidebar = ({ children, ...props }: SidebarProps) => {
  const { currentRoom } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Navbar onOpen={onOpen} currentRoom={currentRoom} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...props }: SidebarContentProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...props}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Slack Chat
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <UserList showAllUser={false} />
    </Box>
  );
};

interface NavbarProps extends FlexProps {
  onOpen: () => void;
  currentRoom?: RoomInterface;
}
const Navbar = ({ onOpen, ...props }: NavbarProps) => {
  const { currentRoom } = props;
  const [participants, setParticipants] = useState<UserInterface[]>([]);
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user as UserInterface;
  const handleSignOut = () => {
    authProvider.signout();
    navigate('/');
  };
  console.log('Participants ', participants);
  console.log('Current Room: ', currentRoom);
  const getParticipantsName = () => {
    return participants.map(
      (participant) => `${participant.firstname} ${participant.lastname}`
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserApi.getByParticipants(
          (currentRoom as RoomInterface).participants
        );
        console.log('Participants fetch: ', res.data);
        if (res.data) {
          const filterParticipants = res.data.filter(
            (participant: UserInterface) => participant._id !== user._id
          );
          setParticipants(filterParticipants);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    if (currentRoom?.participants) {
      fetchData();
    }
  }, [currentRoom?._id]);

  return (
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
      >
        Slack Chat
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Heading size="xs">{getParticipantsName()}</Heading>
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
                <Avatar
                  name={`${user.firstname} ${user.lastname}`}
                  size={'sm'}
                  src={user.avatar}
                >
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
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
              <MenuItem>
                <Flex alignItems="center" gap="0.5em">
                  <Box
                    bgColor="green.500"
                    borderRadius="50%"
                    width="16px"
                    height="16px"
                  />{' '}
                  Online
                </Flex>
              </MenuItem>
              <MenuItem>
                <Flex alignItems="center" gap="0.5em">
                  <Box
                    bgColor="red.500"
                    borderRadius="50%"
                    width="16px"
                    height="16px"
                  />{' '}
                  Busy
                </Flex>
              </MenuItem>
              <MenuItem>
                <Flex alignItems="center" gap="0.5em">
                  <Box
                    bgColor="red.700"
                    borderRadius="50%"
                    width="16px"
                    height="16px"
                  />{' '}
                  Do not disturb
                </Flex>
              </MenuItem>
              <MenuItem>
                <Flex alignItems="center" gap="0.5em">
                  <Box
                    bgColor="gray.500"
                    borderRadius="50%"
                    width="16px"
                    height="16px"
                  />{' '}
                  Away
                </Flex>
              </MenuItem>
              <MenuItem>
                <Flex alignItems="center" gap="0.5em">
                  <Box
                    bgColor="gray.700"
                    borderRadius="50%"
                    width="16px"
                    height="16px"
                  />{' '}
                  Offline
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Sidebar;
