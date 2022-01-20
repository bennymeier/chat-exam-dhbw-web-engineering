import { Flex, SkeletonCircle, Skeleton, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../types';
import { useAuth } from './AuthProvider';
import UserApi from '../api/user.api';
import User from './User';

interface UserListProps {
  click?: (user: UserInterface) => void;
  showAllUser?: boolean;
}
const UserList = (props: UserListProps) => {
  const { click, showAllUser = true } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await UserApi.getAll();
        setData(res.data);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const { user: ownUser } = useAuth();
  const getUsers = () => {
    let users = data;
    if (!showAllUser) {
      users = data.filter(
        (user: UserInterface) => user._id !== (ownUser as UserInterface)._id
      );
    }
    return users;
  };
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

  const handleClick = (user: any) => {
    if (click) {
      click(user);
    } else {
      navigate(`/chat/${user._id}`, { replace: true });
    }
  };

  return (
    <Box
      overflowY="auto"
      height="100%"
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
      {getUsers().map((user: any) => (
        <User key={user._id} user={user} onClick={() => handleClick(user)} />
      ))}
    </Box>
  );
};

export default UserList;
