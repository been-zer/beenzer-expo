import { atom } from 'jotai';
import { io, Socket } from 'socket.io-client';
import Constants from 'expo-constants';

const server = Constants.manifest ? Constants.manifest.extra ? Constants.manifest.extra.REACT_APP_SERVER as string : null : null;

export const SOCKET = io(String(server), { transports: ["websocket"], });//forceBase64: true 


SOCKET.on('serverConnection', (message: string) => {
   console.log(message)
});

export const atomSOCKET = atom<Socket>(SOCKET);