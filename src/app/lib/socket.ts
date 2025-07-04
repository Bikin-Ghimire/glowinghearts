// /lib/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initiateSocket = () => {
  if (!socket) {
    socket = io('https://5050-test.mikematich.ca', {
      transports: ['websocket'],
      secure: true,
      withCredentials: false,
    });
  }
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initiateSocket first.');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
