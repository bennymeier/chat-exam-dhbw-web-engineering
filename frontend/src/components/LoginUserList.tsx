import {
  Flex,
  SkeletonCircle,
  Skeleton,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { User } from '../types';
import UserApi from '../api/user.api';
import Status from './Status';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const LoginUserList = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await UserApi.getAll();
        setUsers(res.data);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  if (isError) return <Box>Fetching users went wrong.</Box>;

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

  const handleClick = (user: User) => {
    auth.signin(user);
    if (user.lastChannel) {
      navigate(`/${user.lastChannelType}/${user.lastChannel}`, {
        replace: true,
      });
    } else {
      navigate(`/${user.lastChannelType}`, { replace: true });
    }
  };

  return (
    <Box
      overflowY="auto"
      overflowX="hidden"
      height="100%"
      backgroundColor="white"
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
    >
      {users.map((user) => (
        <Flex
          key={user._id}
          userSelect="none"
          align="center"
          padding="2"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'teal.500',
            color: 'white',
          }}
          textAlign="left"
          onClick={() => handleClick(user)}
        >
          <Status user={user} />
          <Flex flexDirection="column" alignItems="baseline" width="100%">
            <Heading size="xs" isTruncated width="95%">
              {user.firstname} {user.lastname}
            </Heading>
            <Text fontSize="xs" isTruncated width="95%">
              {user.mail}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};

export default LoginUserList;
