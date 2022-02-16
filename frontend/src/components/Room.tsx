import { Avatar, AvatarGroup, Flex, Heading, Text } from '@chakra-ui/react';
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
  const { name } = room;
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
      <Flex>
        <AvatarGroup size="xs" max={2} mr="0.5em">
          {room.participants.map((participant) => (
            <Avatar
              key={participant._id}
              name={`${participant.firstname} ${participant.lastname}`}
              src={participant.avatar}
            />
          ))}
        </AvatarGroup>
        <Flex flexDirection="column" alignItems="baseline" width="100%">
          <Heading size="xs" isTruncated width="95%">
            {name}
          </Heading>
          <Text fontSize="xs" isTruncated width="95%">
            {room?.lastMessage?.content}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RoomComponent;
