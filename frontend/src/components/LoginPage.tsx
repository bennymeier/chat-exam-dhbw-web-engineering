import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { useAuth } from './AuthProvider';
import LoginUserList from './LoginUserList';
import UserApi from '../api/user.api';
import Register from './Register';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const getUser = () => {
    const isLoggedIn = localStorage.getItem('slack_chat_user');
    let user = null;
    if (isLoggedIn) {
      user = JSON.parse(localStorage.getItem('slack_chat_user') as string);
    }
    return user;
  };

  const generateUser = async () => {
    try {
      const response = await fetch(
        'https://randomuser.me/api/?results=5&noinfo'
      );
      const data = await response.json();
      const res = data.results;
      const users: User[] = res.map((user: any) => {
        return {
          mail: user.email,
          username: user.login.username,
          firstname: user.name.first,
          lastname: user.name.last,
          avatar: user.picture.large,
        };
      });
      users.forEach(async (user) => {
        await UserApi.create(user);
      });
      // TODO: Update userlist instead of hard reloading page
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const user = getUser();
    // Fetch user to update it in localStorage and get the newest data
    const fetchUser = async () => {
      const res = await UserApi.get(user._id);
      return res.data;
    };
    if (user) {
      fetchUser().then((fetchedUser) => {
        auth.signin(fetchedUser);
        navigate('/chat', { replace: true });
      });
    }
  }, [auth, navigate]);

  return (
    <>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
        textAlign="center"
      >
        <Stack spacing={{ base: 5, md: 7 }}>
          <Heading>Login</Heading>
          <Heading size="sm">
            Choose an user to login with. There is no registration or fully
            implemented authentication.
          </Heading>
          <Box maxHeight="640" overflowY="auto">
            <LoginUserList />
          </Box>
        </Stack>
        <Stack spacing={{ base: 5, md: 7 }}>
          <Heading>Sign Up</Heading>
          <Heading size="sm">
            Register a new user and click it in the list to login with.
          </Heading>
          <Button onClick={generateUser}>Generate 5 Random User</Button>
          <Heading size="sm">Or create yourself an user below.</Heading>
          <Register />
        </Stack>
      </Container>
    </>
  );
};

export default LoginPage;
