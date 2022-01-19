const authProvider = {
  user: null,
  signin(user: any) {
    authProvider.user = user;
    localStorage.setItem('slack_chat_user', JSON.stringify(user));
  },
  signout() {
    localStorage.removeItem('slack_chat_user');
  },
};

export default authProvider;
