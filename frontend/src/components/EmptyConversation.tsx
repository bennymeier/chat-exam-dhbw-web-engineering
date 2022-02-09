import { Box, Text, Heading } from '@chakra-ui/react';

const EmptyConversation = () => {
  return (
    <>
      <Box textAlign="center">
        <Heading size="md">You start a new conversation</Heading>
        <Text>Type in your message below.</Text>
      </Box>
    </>
  );
};

export default EmptyConversation;
