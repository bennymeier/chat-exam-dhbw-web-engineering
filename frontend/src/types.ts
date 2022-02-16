export type StatusText =
  | 'Online'
  | 'Busy'
  | 'Do not disturb'
  | 'Away'
  | 'Offline';
export interface Status {
  id: string;
  bgColor: string;
  text: StatusText;
}
export const allStatus: Status[] = [
  { id: 'online', bgColor: 'green.500', text: 'Online' },
  { id: 'busy', bgColor: 'red.500', text: 'Busy' },
  { id: 'dnd', bgColor: 'red.700', text: 'Do not disturb' },
  { id: 'away', bgColor: 'gray.500', text: 'Away' },
  { id: 'offline', bgColor: 'gray.700', text: 'Offline' },
];
export type ChannelType = 'room' | 'chat' | 'activity';

/* MongoDB */
interface MongoSchema {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

/* User */
export interface CreateUser {
  username: string;
  mail: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status?: string;
  lastChannel?: string;
  lastChannelType?: ChannelType;
}
export interface UpdateUser {
  firstname?: string;
  lastname?: string;
  avatar?: string;
  status?: string;
  lastChannel?: string;
  lastChannelType?: ChannelType;
}
export interface User extends MongoSchema {
  username: string;
  mail: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: string;
  lastChannel: string;
  lastChannelType: ChannelType;
}

/* Message */
export interface CreateMessage {
  sender: string;
  channel: string;
  content: string;
  conversationType: 'Chat' | 'Room';
}
export interface UpdateMessage {
  content: string;
}
export interface Message extends MongoSchema {
  sender: User;
  channel: Room;
  content: string;
  conversationType: 'Chat' | 'Room';
}

/* Chats */
export interface CreateChat {
  name?: string;
  partner: string;
  creator: string;
}
export interface UpdateChat {
  name?: string;
  lastMessage?: string;
}
export interface Chat extends MongoSchema {
  name?: string;
  creator: User;
  partner: User;
  lastMessage: Message;
}

/* Rooms */
export interface CreateRoom {
  creator: string;
  name: string;
  description?: string;
  isRoom?: boolean;
}
export interface UpdateRoom {
  name?: string;
  description?: string;
  lastMessage?: string;
}
export interface Room extends MongoSchema {
  name: string;
  description?: string;
  participants: User[];
  creator: User;
  lastMessage: Message;
}
