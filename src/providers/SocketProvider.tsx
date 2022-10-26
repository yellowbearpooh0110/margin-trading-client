import * as React from 'react';
import axios from 'axios';
import { connect as connectSocket, Socket } from 'socket.io-client';

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

const socket = connectSocket('http://localhost:8080');

export type SocketContextType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const SocketContext = React.createContext<SocketContextType>({ socket });

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  return React.useContext(SocketContext);
};
