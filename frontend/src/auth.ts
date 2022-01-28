import { User } from './types';

interface AuthProviderInterface {
  user: User | null;
  signin: (user: User) => void;
  signout: () => void;
}

const authProvider: AuthProviderInterface = {
  user: null,
  signin(user: User) {
    authProvider.user = user;
    localStorage.setItem('slack_chat_user', JSON.stringify(user));
  },
  signout() {
    localStorage.removeItem('slack_chat_user');
  },
};

export default authProvider;
