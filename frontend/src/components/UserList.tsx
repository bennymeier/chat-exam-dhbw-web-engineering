import { Flex, SkeletonCircle, Skeleton, Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../types';
import { GET_USERS } from '../utils';
import { useAuth } from './AuthProvider';
import User from './User';

interface UserListProps {
  click?: (user: UserInterface) => void;
  showAllUser?: boolean;
}
const UserList = (props: UserListProps) => {
  const { click, showAllUser = true } = props;
  const navigate = useNavigate();
  const { user: ownUser } = useAuth();
  const { isLoading, error, data } = useQuery('users', () =>
    fetch(GET_USERS).then((res) => res.json())
  );
  const getUsers = () => {
    let users = data;
    if (!showAllUser) {
      users = data.filter(
        (user: UserInterface) =>
          user.username !== (ownUser as UserInterface).username
      );
    }
    return users;
  };

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
      navigate(`/chat/${user.username}`, { replace: true });
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
        <User
          key={user.username}
          user={user}
          onClick={() => handleClick(user)}
        />
      ))}
    </Box>
  );
};

export default UserList;
