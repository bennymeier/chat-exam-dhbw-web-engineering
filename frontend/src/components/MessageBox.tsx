import { ChangeEvent, useState } from 'react';
import { Flex, IconButton, Textarea } from '@chakra-ui/react';
import { FaTelegramPlane } from 'react-icons/fa';
import { MessageInterface, RoomInterface, UserInterface } from '../types';
import MessageApi from '../api/message.api';

interface MessageBoxProps {
  currentRoom: RoomInterface;
  currentUser: UserInterface;
}
const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const { currentRoom, currentUser } = props;
  const [value, setValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const sendMessage = async () => {
    const data: Partial<MessageInterface> = {
      senderId: currentUser._id,
      roomId: currentRoom._id,
      content: value,
    };
    try {
      await MessageApi.create(data);
      setValue('');
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <Flex alignItems="center" gap="1em">
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder="Enter a new message"
        size="sm"
      />
      <IconButton
        icon={<FaTelegramPlane />}
        aria-label="Send Message"
        onClick={sendMessage}
      />
    </Flex>
  );
};

export default MessageBox;
