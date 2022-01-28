import { type Types, type Document } from 'mongoose';

export type Channel = Chat & Room;

/* Message */
export interface MessageSchema extends Document {
  sender: Types.ObjectId;
  channel: Types.ObjectId;
  content: string;
}
export interface Message extends Document {
  sender: User;
  channel: Room;
  content: string;
}

/* Chat */
export interface ChatSchema extends Document {
  name?: string;
  partner: Types.ObjectId;
  creator: Types.ObjectId;
  lastMessage: Types.ObjectId;
}
export interface Chat extends Document {
  name?: string;
  creator: User;
  partner: User;
  lastMessage: Message;
}
export interface User extends Document {
  username: string;
  mail: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: string;
  lastChannel: string;
  lastChannelType: string;
}

/* User */
export interface UserSchema extends Document {
  username: string;
  mail: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  status: string;
  lastChannel: Types.ObjectId;
  lastChannelType: string;
}

/* Room */
export interface RoomSchema extends Document {
  name: string;
  description?: string;
  participants: Types.ObjectId[];
  creator: Types.ObjectId;
  lastMessage: Types.ObjectId;
}
export interface Room extends Document {
  name: string;
  description?: string;
  participants: User[];
  creator: User;
  lastMessage: Message;
}
