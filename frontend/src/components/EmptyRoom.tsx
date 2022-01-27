import { Box, Flex, Heading } from '@chakra-ui/react';
import CreateRoom from './CreateRoom';
import CreateChat from './CreateChat';

const EmptyRoom = () => {
  return (
    <>
      <Box>
        <Heading textAlign="center" size="md">
          Start a conversation!
          <Flex gap="1em" justifyContent="center" margin="1em">
            <Box>
              <CreateChat />
            </Box>
            <Box>
              <CreateRoom />
            </Box>
          </Flex>
        </Heading>
      </Box>
    </>
  );
};

export default EmptyRoom;
