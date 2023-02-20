import { atom } from 'jotai';
import { io, Socket } from 'socket.io-client';
import { REACT_APP_SERVER } from './../../config';

const server = REACT_APP_SERVER;
export const SOCKET = io(String(server), { transports: ["websocket"], });//forceBase64: true 


SOCKET.on('serverConnection', (message: string) => {
   console.log(message)
});

export const atomSOCKET = atom<Socket>(SOCKET);