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
import { FaUserFriends } from 'react-icons/fa';
import { useAuth } from './AuthProvider';
import RoomApi from '../api/room.api';
import UserApi from '../api/user.api';
import { UserInterface } from '../types';
import { useSocket } from './SocketProvider';
import { useNavigate } from 'react-router-dom';

interface RoomInterface {
  name: string;
  description?: string;
  participants: string[];
  isRoom: boolean;
}
const CreateRoom = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const socket = useSocket();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [room, setRoom] = useState<RoomInterface>({
    name: '',
    isRoom: true,
    description: '',
    participants: [],
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoom((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async () => {
    const roomData = {
      ...room,
      participants: [(currentUser as UserInterface)._id],
    };
    try {
      const res = await RoomApi.create(roomData);
      socket.emit('room:created', res.data);
      onClose();
      const userData = { ...currentUser, lastRoomId: res.data._id };
      await UserApi.update(userData, (currentUser as UserInterface)._id);
      navigate(`/room/${res.data._id}`, { replace: true });
      toast({
        title: 'Room created.',
        description: "We've created your room for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Room couldn't be created.",
        description:
          "We couldn't create a room for you. Please contact the administrator.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.warn(err);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" rightIcon={<FaUserFriends />}>
        Create a room
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">Create a room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Box>
                <Text color="gray.500">
                  Channels are where your team communicates.
                </Text>
              </Box>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Newsletter Planning"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  id="description"
                  name="description"
                  placeholder="e.g. What's this channel about?"
                  onChange={handleChange}
                />
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
                disabled={!room?.name}
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

export default CreateRoom;
