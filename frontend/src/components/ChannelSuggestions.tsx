import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Room, User } from '../types';
import RoomApi from '../api/room.api';
import UserApi from '../api/user.api';
import CreateChat from './CreateChat';
import CreateRoom from './CreateRoom';
import { useAuth } from './AuthProvider';

interface ChannelSuggestionProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const ChannelSuggestions: React.FC<ChannelSuggestionProps> = (props) => {
  const currentUser = useAuth().user as User;
  const { isOpen, onClose } = props;
  const [rooms, setRooms] = useState<Room[]>([]);
  const handleJoinRoom = async (room: Room) => {
    await RoomApi.joinRoom(room._id, currentUser._id);
    await UserApi.update(
      { lastChannelType: 'room', lastChannel: room._id },
      currentUser._id
    );
  };
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await RoomApi.getAll('0', true, currentUser._id);
        setRooms(res.data);
      } catch (err) {
        console.warn(err);
      }
    };
    if (isOpen) {
      fetchRooms();
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join or create a room or chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box margin="1em">
              <SimpleGrid minChildWidth="250px" spacing="15px">
                {rooms.map((room) => {
                  const { name, _id, participants, creator } = room;
                  return (
                    <Flex
                      key={_id}
                      alignItems="center"
                      flexDirection="column"
                      padding="1em"
                      bgColor="gray.300"
                      gap="0.5em"
                      _hover={{ bgColor: 'gray.400' }}
                    >
                      <Box>
                        <AvatarGroup size="md" max={2}>
                          <Avatar
                            key={creator._id}
                            name={`${creator.firstname} ${creator.lastname}`}
                            src={creator.avatar}
                          />
                          );
                          {participants.map((participant) => {
                            const { firstname, lastname, avatar, _id } =
                              participant;
                            return (
                              <Avatar
                                key={_id}
                                name={`${firstname} ${lastname}`}
                                src={avatar}
                              />
                            );
                          })}
                        </AvatarGroup>
                      </Box>
                      <Box width="-webkit-fill-available">
                        <Heading size="sm" isTruncated>
                          {name}
                        </Heading>
                      </Box>
                      <Box>
                        <Button onClick={() => handleJoinRoom(room)} size="xs">
                          Join Room
                        </Button>
                      </Box>
                    </Flex>
                  );
                })}
              </SimpleGrid>
            </Box>

            <CreateChat />
            <CreateRoom />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChannelSuggestions;
