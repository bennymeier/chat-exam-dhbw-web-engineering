import { UserInterface } from '../types';
import { API } from './api';

class UserApi {
  getAll() {
    return API.get('/users');
  }
  get(id: string) {
    return API.get(`/user/${id}`);
  }
  getByParticipants(participants: string[]) {
    return API.get(`/users/${JSON.stringify(participants)}`);
  }
  create(data: Partial<UserInterface>) {
    return API.post('/user', data);
  }
  update(data: Partial<UserInterface>, id: string) {
    return API.put(`/user/${id}`, data);
  }
  delete(id: string) {
    return API.delete(`/user/${id}`);
  }
  search(value: string, limit?: string) {
    return API.get(
      `/users/search/?value=${value}&limit=${!!limit ? limit : ''}`
    );
  }
}

export default new UserApi();
