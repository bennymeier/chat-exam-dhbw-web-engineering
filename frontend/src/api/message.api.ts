import { CreateMessage, UpdateMessage } from '../types';
import { API } from './api';

class MessageApi {
  getAll() {
    return API.get('/messages');
  }
  get(messageId: string) {
    return API.get(`/message/${messageId}`);
  }
  getMessagesByChannelId(channelId: string) {
    return API.get(`/messages/${channelId}`);
  }
  create(data: CreateMessage) {
    return API.post('/message', data);
  }
  update(data: UpdateMessage, messageId: string) {
    return API.put(`/message/${messageId}`, data);
  }
  delete(messageId: string) {
    return API.delete(`/message/${messageId}`);
  }
}

export default new MessageApi();
