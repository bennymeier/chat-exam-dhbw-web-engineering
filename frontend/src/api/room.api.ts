import { RoomInterface } from '../types';
import { API } from './api';

class RoomApi {
  getAll() {
    return API.get('/rooms');
  }
  getByParticipants(participants: string[]) {
    return API.get(`/room/${JSON.stringify(participants)}`);
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
