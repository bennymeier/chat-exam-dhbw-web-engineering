import { Flex, Heading, Text } from '@chakra-ui/react';
import { RoomInterface } from '../types';

interface UserProps {
  room: RoomInterface;
  onClick?: (room: RoomInterface) => void;
  activeId: string;
}
const Room: React.FC<UserProps> = (props) => {
  const { room, onClick, activeId } = props;
  const { name, description } = room;
  const isCurrentRoom = room._id === activeId;
  const handleClick = () => {
    if (onClick) {
      onClick(room);
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
      <Flex flexDirection="column" alignItems="baseline" width="100%">
        <Heading size="xs">{name}</Heading>
        <Text fontSize="xs" isTruncated width="95%">
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Room;
