import { UserInterface } from '../types';
import { API } from './api';

class UserApi {
  getAll() {
    return API.get('/users');
  }
  get(id: string) {
    return API.get(`/user/${id}`);
  }
  create(data: UserInterface) {
    return API.post('/user', data);
  }
  update(data: UserInterface, id: string) {
    return API.put(`/user/${id}`, data);
  }
  delete(id: string) {
    return API.delete(`/user/${id}`);
  }
}

export default new UserApi();
