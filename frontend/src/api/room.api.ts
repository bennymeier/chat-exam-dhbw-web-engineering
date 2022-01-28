import { CreateRoom, UpdateRoom } from '../types';
import { API } from './api';

class RoomApi {
  search(currentUserId: string, searchValue: string, limit = '0') {
    return API.get(
      `/rooms/search/?currentUserId=${currentUserId}&searchValue=${searchValue}&limit=${limit}`
    );
  }
  getAll(limit = '0', filterMe?: boolean, userId?: string) {
    return API.get(
      `/rooms/search?limit=${limit}&filterme=${filterMe}&userid=${userId}`
    );
  }
  get(id: string) {
    return API.get(`/room/${id}`);
  }
  getCurrentUserRooms(userId: string) {
    return API.get(`/rooms/user/${userId}`);
  }
  create(data: CreateRoom) {
    return API.post('/room', data);
  }
  update(data: UpdateRoom, id: string) {
    return API.put(`/room/${id}`, data);
  }
  delete(id: string) {
    return API.delete(`/room/${id}`);
  }
  joinRoom(roomId: string, userId: string) {
    return API.put(`/room/join/${roomId}`, { userId });
  }
  leaveRoom(roomId: string, userId: string) {
    return API.put(`/room/leave/${roomId}`, { userId });
  }
}

export default new RoomApi();
