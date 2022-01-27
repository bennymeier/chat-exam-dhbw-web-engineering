import { Flex, SkeletonCircle, Skeleton, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusInterface, UserInterface } from '../types';
import { useAuth } from './AuthProvider';
import UserApi from '../api/user.api';
import User from './User';
import { useSocket } from './SocketProvider';

interface UserListProps {
  onClick?: (user: UserInterface) => void;
  showAllUser?: boolean;
}
const UserList = (props: UserListProps) => {
  const { onClick, showAllUser = true } = props;
  const socket = useSocket();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const getUsers = () => {
    let allUsers = users;
    if (!showAllUser) {
      allUsers = allUsers.filter(
        (user: UserInterface) => user._id !== (currentUser as UserInterface)._id
      );
    }
    return allUsers;
  };

  useEffect(() => {
    socket.on(
      'status:change',
      ({ user, status }: { user: UserInterface; status: StatusInterface }) => {
        const allUsers = users.map((userObj) => {
          if (userObj._id === user._id) {
            return { ...userObj, status: status.id };
          }
          return userObj;
        });
        setUsers(allUsers);
        console.log(
          `${user.firstname} ${user.lastname} changed his status to ${status.text}`
        );
      }
    );
    return () => {
      socket.off('status:change');
    };
  }, [socket, users]);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
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

  const handleClick = (user: UserInterface) => {
    if (onClick) {
      onClick(user);
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
      {getUsers().map((user: UserInterface) => (
        <User key={user._id} user={user} onClick={handleClick} />
      ))}
    </Box>
  );
};

export default UserList;
