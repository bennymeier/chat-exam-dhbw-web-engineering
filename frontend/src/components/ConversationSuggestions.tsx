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
import { RoomInterface, UserInterface } from '../types';
import RoomApi from '../api/room.api';
import CreateChat from './CreateChat';
import CreateRoom from './CreateRoom';
import { useAuth } from './AuthProvider';

interface ConversationSuggestionsProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const ConversationSuggestions: React.FC<ConversationSuggestionsProps> = (
  props
) => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = props;
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const handleJoinRoom = async (room: RoomInterface) => {
    const participants = room.participants.map((user) => user._id);
    const roomData = {
      ...room,
      participants: [...participants, (user as UserInterface)._id],
    };
    const res = await RoomApi.update(roomData, room._id);
    console.log(res.data);
  };
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await RoomApi.getAll(
          undefined,
          true,
          (user as UserInterface)._id
        );
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
                  const { name, _id, participants } = room;
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
                      <Box>
                        <Heading size="sm">{name}</Heading>
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

export default ConversationSuggestions;
