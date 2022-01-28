import { Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Room, User } from '../types';
import UserApi from '../api/user.api';

interface UserProps {
  room: Room;
  activeId: string;
  currentUser: User;
}
const RoomComponent: React.FC<UserProps> = (props) => {
  const navigate = useNavigate();
  const { room, activeId, currentUser } = props;
  const { name, description } = room;
  const isCurrentRoom = room._id === activeId;
  const handleClick = async () => {
    await UserApi.update(
      { lastChannelType: 'room', lastChannel: room._id },
      currentUser._id
    );
    navigate(`/room/${room._id}`, { replace: true });
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
      textAlign="left"
      onClick={handleClick}
    >
      <Flex flexDirection="column" alignItems="baseline" width="100%">
        <Heading size="xs" isTruncated width="95%">
          {name}
        </Heading>
        <Text fontSize="xs" isTruncated width="95%">
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default RoomComponent;
