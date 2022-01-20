export type Status = 'Online' | 'Busy' | 'Do not disturb' | 'Away' | 'Offline';

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
  status: Status;
  chats: string[];
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
