import {Server, Socket} from 'socket.io';
import {v4 as uuidV4} from 'uuid';
import {PlayerAction, ActionError} from './types';
import {client} from './redisClient';

export const socketOnConnection = async (socket: Socket, io: Server) => {
  const db = await client;
  socket.on('create', () => {
    const roomId = uuidV4();
    socket.join(roomId);
    db.set(socket.id, roomId);
    db.rPush(`room_admin-${roomId}`, socket.id);
    console.log(roomId);
    socket.emit('create', roomId);
  });
  socket.on('join', async (roomId: string) => {
    const lastRoom = await db.get(socket.id);
    if (lastRoom !== null) socket.leave(lastRoom);
    socket.join(roomId);

    db.set(socket.id, roomId);
    socket.emit('join', roomId);
  });
  async function checkAdminPermission(roomId: string): Promise<boolean> {
    const adminUsers = await db.lRange(
      `room_admin-${roomId}`,
      0,
      await db.lLen(`room_admin-${roomId}`)
    );
    return adminUsers.findIndex(val => socket.id === val) !== -1;
  }
  socket.on('play', async (data: PlayerAction) => {
    if (!(await checkAdminPermission(data.roomId))) {
      socket.emit('error',{
        error: 'Cannot perform this action',
        cause: 'Not sufficient permission',
      });
      return;
    }
    io.to(data.roomId).emit('play', data);
  });
  socket.on('pause', async (data: PlayerAction) => {
    if (!(await checkAdminPermission(data.roomId))) {
      socket.emit('error',{
        error: 'Cannot perform this action',
        cause: 'Not sufficient permission',
      });
      return;
    }
    io.to(data.roomId).emit('pause', data);
  });
};
