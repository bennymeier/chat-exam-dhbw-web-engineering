import { UserInterface } from './types';

interface AuthProviderInterface {
  user: UserInterface | null;
  signin: (user: UserInterface) => void;
  signout: () => void;
}

const authProvider: AuthProviderInterface = {
  user: null,
  signin(user: UserInterface) {
    authProvider.user = user;
    localStorage.setItem('slack_chat_user', JSON.stringify(user));
  },
  signout() {
    localStorage.removeItem('slack_chat_user');
  },
};

export default authProvider;
