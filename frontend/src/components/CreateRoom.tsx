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
import { CreateRoom, UpdateUser, User } from '../types';
import { useSocket } from './SocketProvider';
import { useNavigate } from 'react-router-dom';
import { ROOM_CREATE } from '../socket.events';

const CreateRoomComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const socket = useSocket();
  const navigate = useNavigate();
  const currentUser = useAuth().user as User;
  const [room, setRoom] = useState<CreateRoom>({
    name: '',
    isRoom: true,
    description: '',
    creator: currentUser._id,
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
      creator: currentUser._id,
    };
    try {
      const res = await RoomApi.create(roomData);
      socket.emit(ROOM_CREATE, res.data);
      const userData: UpdateUser = {
        lastChannel: res.data._id,
        lastChannelType: 'room',
      };
      await UserApi.update(userData, (currentUser as User)._id);
      navigate(`/room/${res.data._id}`, { replace: true });
      toast({
        title: 'Room created.',
        description: "We've created your room for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
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
                  Rooms are where your team communicates.
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
                  placeholder="e.g. What's this room about?"
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

export default CreateRoomComponent;
