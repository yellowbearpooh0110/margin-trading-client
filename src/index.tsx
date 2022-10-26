import * as React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'App';
import { SidebarProvider } from 'contexts/SidebarContext';
import * as serviceWorker from 'serviceWorker';
import AuthProvider from './providers/AuthProvider';
import axios from 'axios';
import SocketProvider from 'providers/SocketProvider';
import { apiUrl } from 'config';

axios.defaults.baseURL = `${apiUrl}api/`;

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <AuthProvider>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </AuthProvider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
