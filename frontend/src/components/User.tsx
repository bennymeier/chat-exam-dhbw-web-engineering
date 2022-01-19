import {
  FlexProps,
  Flex,
  Avatar,
  AvatarBadge,
  Heading,
  Text,
} from '@chakra-ui/react';
import { UserInterface } from '../types';

interface UserProps extends FlexProps {
  user: UserInterface;
}
const User = ({ user, ...rest }: UserProps) => {
  const { firstname, lastname, avatar, mail } = user;
  return (
    <Flex
      align="center"
      py="2"
      px="1"
      mx="2"
      borderRadius="md"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'teal.500',
        color: 'white',
      }}
      {...rest}
    >
      <Avatar name={`${firstname} ${lastname}`} src={avatar} mr="4" size="md">
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" alignItems="baseline">
        <Heading size="xs">
          {firstname} {lastname}
        </Heading>
        <Text fontSize="xs">{mail}</Text>
      </Flex>
    </Flex>
  );
};

export default User;
