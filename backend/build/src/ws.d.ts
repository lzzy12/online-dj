import { Server, Socket } from 'socket.io';
export declare const socketOnConnection: (socket: Socket, io: Server) => Promise<void>;
