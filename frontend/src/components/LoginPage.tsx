import { Box, Container, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../types';
import { useAuth } from './AuthProvider';
import UserList from './UserList';

const LoginPage = () => {
  let navigate = useNavigate();
  let auth = useAuth();

  const handleClick = (user: UserInterface) => {
    auth.signin(user);
    navigate('/chat', { replace: true });
  };

  const getUser = () => {
    const isLoggedIn = localStorage.getItem('slack_chat_user');
    let user = null;
    if (isLoggedIn) {
      user = JSON.parse(localStorage.getItem('slack_chat_user') as string);
    }
    return user;
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      auth.signin(user);
      navigate('/chat', { replace: true });
    }
  }, [auth, navigate]);

  if (auth && auth.user) {
    navigate('/chat', { replace: true });
  }

  return (
    <>
      <Container textAlign="center">
        <Box my="5">
          <Heading mb="3">Login</Heading>
          <Heading size="sm">
            Choose an user to login with. There is no registration or fully
            implemented authentication.
          </Heading>
        </Box>
        <UserList click={handleClick} />
      </Container>
    </>
  );
};

export default LoginPage;
