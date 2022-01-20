import { RoomInterface } from '../types';
import { API } from './api';

class RoomApi {
  getAll() {
    return API.get('/rooms');
  }
  get(id: string) {
    return API.get(`/room/${id}`);
  }
  create(data: RoomInterface) {
    return API.post('/room', data);
  }
  update(data: RoomInterface, id: string) {
    return API.put(`/room/${id}`, data);
  }
  delete(id: string) {
    return API.delete(`/room/${id}`);
  }
}

export default new RoomApi();
