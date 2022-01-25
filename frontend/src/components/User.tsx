import { FlexProps, Flex, Heading, Text } from '@chakra-ui/react';
import { UserInterface } from '../types';
import Status from './Status';

interface UserProps extends FlexProps {
  user: UserInterface;
}
const User = ({ user, ...rest }: UserProps) => {
  const { firstname, lastname, mail } = user;
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
      <Status user={user} />
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
