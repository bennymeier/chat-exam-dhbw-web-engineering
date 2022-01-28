import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from './AuthProvider';
import ChatApi from '../api/chat.api';
import UserApi from '../api/user.api';
import { CreateChat, User } from '../types';
import { useSocket } from './SocketProvider';
import UserSearch from './UserSearch';
import { useNavigate } from 'react-router-dom';

const CreateChatComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const socket = useSocket();
  const currentUser = useAuth().user as User;
  const [chat, setChat] = useState<CreateChat>({
    partner: '',
    name: '',
    creator: currentUser._id,
  });
  const [selectedUser, setSelectedUser] = useState<User>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChat((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const res = await ChatApi.create({
        ...chat,
        partner: (selectedUser as User)._id,
      });
      await UserApi.update(
        { lastChannel: res.data.id, lastChannelType: 'chat' },
        currentUser._id
      );
      socket.emit('chat:create', res.data);
      navigate(`/chat/${res.data._id}`, { replace: true });
      toast({
        title: 'Chat created.',
        description: `We've created the chat with ${selectedUser?.firstname} ${selectedUser?.lastname} for you.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      toast({
        title: "Chat couldn't be created.",
        description:
          "We couldn't create a chat for you. Please contact the administrator.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.warn(err);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" leftIcon={<FaUser />}>
        Start a private chat
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">Start a private chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Box>
                <Text color="gray.500">
                  Chats are for communication with one person. Later you can
                  change your chat to a room.
                </Text>
              </Box>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Newsletter Planning"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="user">User</FormLabel>
                <UserSearch onSelect={(user: User) => setSelectedUser(user)} />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Flex gap="1em">
              <Button variant="ghost" onClick={onClose} colorScheme="red">
                Cancel
              </Button>
              <Button
                colorScheme="green"
                mr={3}
                onClick={handleSubmit}
                disabled={!selectedUser}
              >
                Create
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateChatComponent;
