import { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Link,
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
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { useQuery } from 'react-query';
import { GET_USERS } from '../utils';
import authProvider from '../auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Sidebar = ({ children }: { children: ReactNode }) => {
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
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Slack Chat
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <UserList />
    </Box>
  );
};

interface UserListProps {
  click?: (user: any) => void;
}
export const UserList = (props: UserListProps) => {
  const { click } = props;
  const { isLoading, error, data } = useQuery('users', () =>
    fetch(GET_USERS).then((res) => res.json())
  );
  if (isLoading)
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <Flex key={index} p="4" mx="4" alignItems="center">
            <SkeletonCircle size="10" mr="4" />
            <Skeleton height="15" width="100px" />
          </Flex>
        ))}
      </>
    );

  const handleClick = (user: any) => {
    if (click) {
      click(user);
    }
  };

  return (
    <Box overflowY="auto" height="100%">
      {data.map((user: any) => (
        <User
          key={user.username}
          user={user}
          onClick={() => handleClick(user)}
        />
      ))}
    </Box>
  );
};

interface UserProps extends FlexProps {
  user: any;
}
const User = ({ user, ...rest }: UserProps) => {
  const { firstname, lastname, avatar, mail } = user;
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        py="2"
        px="1"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        <Avatar name={`${firstname} ${lastname}`} src={avatar} mr="4" size="md">
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Flex flexDirection="column" alignItems="baseline">
          <Heading size="xs">
            {firstname} {lastname}
          </Heading>
          <Text fontSize="xs">{mail}</Text>
        </Flex>
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleSignOut = () => {
    authProvider.signout();
    navigate('/');
  };

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
      {...rest}
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
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
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
