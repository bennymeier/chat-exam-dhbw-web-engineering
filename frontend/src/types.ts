export type Status = 'Online' | 'Busy' | 'Do not disturb' | 'Away' | 'Offline';
export interface StatusInterface {
  id: string;
  bgColor: string;
  text: Status | string;
}
export const allStatus: StatusInterface[] = [
  { id: 'online', bgColor: 'green.500', text: 'Online' },
  { id: 'busy', bgColor: 'red.500', text: 'Busy' },
  { id: 'dnd', bgColor: 'red.700', text: 'Do not disturb' },
  { id: 'away', bgColor: 'gray.500', text: 'Away' },
  { id: 'offline', bgColor: 'gray.700', text: 'Offline' },
];

interface MongoSchema {
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface UserInterface extends MongoSchema {
  username: string;
  mail: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: Status | string;
  lastRoomId: string;
}

export interface RoomInterface extends MongoSchema {
  name?: string;
  participants: string[];
}

export interface MessageInterface extends MongoSchema {
  senderId: string;
  roomId: string;
  content: string;
}
