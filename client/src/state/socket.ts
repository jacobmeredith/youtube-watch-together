import socket from 'socket.io-client';

export const io = socket.io(process.env.REACT_APP_SOCKET_URL ? process.env.REACT_APP_SOCKET_URL : '');
