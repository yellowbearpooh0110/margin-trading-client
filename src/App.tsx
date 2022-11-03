import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { getRoutes } from 'router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { useAuth } from './providers/AuthProvider';
import axios from 'axios';
import AxiosService from 'services/axios';

const App: React.FC = () => {
  const { authState, setAuthState } = useAuth();
  const content = useRoutes(getRoutes(authState.loggedIn));

  React.useEffect(() => {
    if (authState.jwtToken) {
      AxiosService.getUserProfile()
        .then((user) => {
          setAuthState({
            loggedIn: true,
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar
          });
          console.log('Get Profile');
        })
        .catch((err) => {
          setAuthState({ loggedIn: false });
        });
    }
  }, [authState.jwtToken]);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
};
export default App;
