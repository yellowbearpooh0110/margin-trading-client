import * as React from 'react';
import axios from 'axios';

export type AuthStateType = {
  loggedIn?: boolean;
  name?: string;
  avatar?: string;
  email?: string;
  jwtToken?: string;
};

const localStorageAuthState = localStorage.getItem('auth-state');
const defaultAuthState: AuthStateType = {
  loggedIn: false
};
if (localStorageAuthState) {
  Object.assign(
    defaultAuthState,
    JSON.parse(localStorageAuthState) as AuthStateType
  );
  if (defaultAuthState.jwtToken)
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${defaultAuthState.jwtToken}`;
}

export type AuthContextType = {
  authState: AuthStateType;
  setAuthState: (authState: AuthStateType) => void;
};

const AuthContext = React.createContext<AuthContextType>({
  authState: defaultAuthState
} as AuthContextType);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [authState, setAuthState] =
    React.useState<AuthStateType>(defaultAuthState);
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (_val) => {
          localStorage.setItem(
            'auth-state',
            JSON.stringify({ ...authState, ..._val })
          );
          setAuthState((_prev) => ({ ..._prev, ..._val }));
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return React.useContext(AuthContext);
};
