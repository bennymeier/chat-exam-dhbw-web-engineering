import { Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import Status from './Status';

interface UserProps {
  user: User;
  shouldNavigate?: boolean;
}
const UserComponent: React.FC<UserProps> = (props) => {
  const { user, shouldNavigate } = props;
  const { firstname, lastname, mail, lastChannel } = user;
  const navigate = useNavigate();
  const handleClick = () => {
    if (shouldNavigate) {
      navigate(`/chat/${lastChannel}`, { replace: true });
    }
  };

  return (
    <Flex
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
      onClick={handleClick}
    >
      <Status user={user} />
      <Flex flexDirection="column" alignItems="baseline" width="100%">
        <Heading size="xs" isTruncated width="95%">
          {firstname} {lastname}
        </Heading>
        <Text fontSize="xs" isTruncated width="95%">
          {mail}
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserComponent;
