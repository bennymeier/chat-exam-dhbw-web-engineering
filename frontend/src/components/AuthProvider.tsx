import { createContext, ReactNode, useContext, useState } from 'react';
import authProvider from '../auth';

interface AuthContextType {
  user: any;
  signin: (user: string) => void;
  signout: () => void;
}

let AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  let [user, setUser] = useState<any>(null);

  let signin = (newUser: any) => {
    authProvider.signin(newUser);
    setUser(newUser);
  };

  let signout = () => {
    authProvider.signout();
    setUser(null);
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
