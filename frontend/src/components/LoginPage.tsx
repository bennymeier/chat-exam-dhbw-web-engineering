import { Container, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { UserList } from './Sidebar';

const LoginPage = () => {
  let navigate = useNavigate();
  let auth = useAuth();

  const handleClick = (user: any) => {
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
  }, []);

  if (auth && auth.user) {
    navigate('/chat', { replace: true });
  }

  return (
    <>
      <Container textAlign="center">
        <Heading>Login</Heading>
        <Heading size="sm">
          Choose an user to login with. There is no registration or fully
          implemented authentication.
        </Heading>
        <UserList click={handleClick} />
      </Container>
    </>
  );
};

export default LoginPage;
