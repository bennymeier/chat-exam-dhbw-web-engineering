import { CreateChat, UpdateChat } from '../types';
import { API } from './api';

class ChatApi {
  // search(currentUserId: string, searchValue: string, limit = '0') {
  //   return API.get(
  //     `/chats/search/?currentUserId=${currentUserId}&searchValue=${searchValue}&limit=${limit}`
  //   );
  // }
  getAll(limit = '0', filterMe?: boolean, userId?: string) {
    return API.get(
      `/chats/search?limit=${limit}&filterme=${filterMe}&userid=${userId}`
    );
  }
  get(chatId: string) {
    return API.get(`/chat/${chatId}`);
  }
  getCurrentUserChats(userId: string) {
    return API.get(`/chats/user/${userId}`);
  }
  create(data: CreateChat) {
    return API.post('/chat', data);
  }
  update(data: UpdateChat, chatId: string) {
    return API.put(`/chat/${chatId}`, data);
  }
  delete(chatId: string) {
    return API.delete(`/chat/${chatId}`);
  }
}

export default new ChatApi();
