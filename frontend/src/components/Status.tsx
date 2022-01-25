import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { allStatus, UserInterface } from '../types';

interface StatusProps {
  user: UserInterface;
}
const Status: React.FC<StatusProps> = (props) => {
  const { user } = props;
  const { firstname, lastname, avatar } = user;
  // TODO: Better use useEffect with [user.status]?
  // TODO: Better to use socket.on("status:change") here?
  // TODO: Change avatar here too
  const getStatus = () => {
    const currentStatus = allStatus.find(
      (statusObj) => statusObj.id === user.status
    );
    return currentStatus;
  };

  return (
    <Avatar name={`${firstname} ${lastname}`} src={avatar} mr="4" size="md">
      <AvatarBadge
        boxSize="1.25em"
        bg={getStatus()?.bgColor}
        title={getStatus()?.text}
      />
    </Avatar>
  );
};

export default Status;
