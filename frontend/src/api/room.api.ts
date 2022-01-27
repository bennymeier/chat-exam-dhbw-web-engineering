import { API } from './api';

interface RoomInterface {
  name?: string;
  description?: string;
  participants: string[];
  isRoom?: boolean;
}
class RoomApi {
  getAll(limit = '0', filterMe?: boolean, userId?: string) {
    return API.get(
      `/rooms/search?limit=${limit}&userid=${userId}&filterme=${filterMe}`
    );
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
