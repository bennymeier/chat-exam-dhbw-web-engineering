import { MessageInterface } from '../types';
import { API } from './api';

class MessageApi {
  getAll() {
    return API.get('/messages');
  }
  get(id: string) {
    return API.get(`/message/${id}`);
  }
  create(data: MessageInterface) {
    return API.post('/message', data);
  }
  update(data: MessageInterface, id: string) {
    return API.put(`/message/${id}`, data);
  }
  delete(id: string) {
    return API.delete(`/message/${id}`);
  }
}

export default new MessageApi();
