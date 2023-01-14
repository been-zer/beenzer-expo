import { Socket } from 'socket.io-client';

export const socketConnection = (pubKey: string, SOCKET: Socket) => {
   console.log('new connection', pubKey);
   SOCKET.emit('newConnection', pubKey);
}