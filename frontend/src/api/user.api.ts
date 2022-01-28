import { CreateUser, UpdateUser } from '../types';
import { API } from './api';

class UserApi {
  getAll() {
    return API.get('/users');
  }
  get(userId: string) {
    return API.get(`/user/${userId}`);
  }
  create(data: CreateUser) {
    return API.post('/user', data);
  }
  update(data: UpdateUser, userId: string) {
    return API.put(`/user/${userId}`, data);
  }
  delete(userId: string) {
    return API.delete(`/user/${userId}`);
  }
  search(value: string, limit = '0') {
    return API.get(`/users/search/?value=${value}&limit=${limit}`);
  }
  getStatus(userId: string) {
    return API.get(`/user/status/${userId}`);
  }
}

export default new UserApi();
