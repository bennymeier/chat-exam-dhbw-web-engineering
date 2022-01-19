export type Status = 'Online' | 'Busy' | 'Do not disturb' | 'Away' | 'Offline';

interface MongoSchema {
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface UserInterface extends MongoSchema {
  username: string;
  mail: string;
  password?: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: Status;
  chats: string[];
  lastChatId: string;
}

export interface RoomInterface extends MongoSchema {
  name: string;
  roomId: string;
  userIds: string[];
  messageIds: string[];
}

export interface MessageInterface extends MongoSchema {
  roomId: string;
  userId: string;
  messageBody: string;
  isDeleted: boolean;
}
