import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { allStatus, User, Status } from '../types';
import { useSocket } from './SocketProvider';
import UserApi from '../api/user.api';

interface StatusProps {
  user: User;
}
const StatusComponent: React.FC<StatusProps> = (props) => {
  const { user: currentUser } = props;
  const socket = useSocket();
  const mountedRef = useRef(true);
  const { firstname, lastname, avatar } = currentUser;
  const [status, setStatus] = useState<Status>({
    id: 'offline',
    text: 'Offline',
    bgColor: 'gray.700',
  });
  // TODO: Change avatar here too
  const getStatus = (statusId: string) => {
    const currentStatus = allStatus.find((status) => status.id === statusId);
    return currentStatus as Status;
  };
  const fetchStatus = useCallback(async () => {
    const res = await UserApi.getStatus(currentUser._id);
    if (!mountedRef.current) return null;
    setStatus(getStatus(res.data.status));
  }, [mountedRef, currentUser.status]);

  useEffect(() => {
    mountedRef.current = true;
    socket.on(
      'status:change',
      ({ user, statusId }: { user: User; statusId: string }) => {
        if (user._id === currentUser._id) {
          console.log(`Change status of ${user.firstname} to ${statusId}`);
          setStatus(getStatus(statusId));
        }
      }
    );
    fetchStatus();
    return () => {
      socket.off('status:change');
      mountedRef.current = false;
    };
  }, [socket, currentUser.status, fetchStatus]);

  return (
    <Avatar name={`${firstname} ${lastname}`} src={avatar} mr="4" size="md">
      <AvatarBadge boxSize="1.25em" bg={status.bgColor} title={status.text} />
    </Avatar>
  );
};

export default StatusComponent;
