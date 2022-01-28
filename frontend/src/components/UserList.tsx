import { Flex, SkeletonCircle, Skeleton, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { User } from '../types';
import UserApi from '../api/user.api';
import UserComponent from './User';

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   socket.on(
  //     'status:change',
  //     ({ user, status }: { user: User; status: Status }) => {
  //       const allUsers = users.map((userObj) => {
  //         if (userObj._id === user._id) {
  //           return { ...userObj, status: status.id };
  //         }
  //         return userObj;
  //       });
  //       setUsers(allUsers);
  //       console.log(
  //         `${user.firstname} ${user.lastname} changed his status to ${status.text}`
  //       );
  //     }
  //   );
  //   return () => {
  //     socket.off('status:change');
  //   };
  // }, [socket, users]);

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
      {users.map((user: User) => (
        <UserComponent key={user._id} user={user} shouldNavigate />
      ))}
    </Box>
  );
};

export default UserList;
