import { Flex, Heading, Text } from '@chakra-ui/react';
import { RoomInterface, UserInterface } from '../types';
import Status from './Status';

interface UserProps {
  user: UserInterface;
  room?: RoomInterface;
  onClick?: (user: UserInterface, room?: RoomInterface) => void;
  activeId?: string;
}
const User: React.FC<UserProps> = (props) => {
  const { user, room, onClick, activeId } = props;
  const { firstname, lastname, mail } = user;
  const isCurrentRoom = room?._id === activeId;
  const handleClick = () => {
    if (onClick) {
      onClick(user, room);
    }
  };
  return (
    <Flex
      userSelect="none"
      align="center"
      padding="2"
      role="group"
      cursor="pointer"
      bg={isCurrentRoom ? 'teal.500' : ''}
      color={isCurrentRoom ? 'white' : ''}
      _hover={{
        bg: 'teal.500',
        color: 'white',
      }}
      onClick={handleClick}
    >
      <Status user={user} />
      <Flex flexDirection="column" alignItems="baseline" width="100%">
        <Heading size="xs">
          {firstname} {lastname}
        </Heading>
        <Text fontSize="xs" isTruncated width="95%">
          {mail}
        </Text>
      </Flex>
    </Flex>
  );
};

export default User;
