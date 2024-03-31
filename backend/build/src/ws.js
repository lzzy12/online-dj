"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketOnConnection = void 0;
const uuid_1 = require("uuid");
const redisClient_1 = require("./redisClient");
const socketOnConnection = async (socket, io) => {
    const db = await redisClient_1.client;
    socket.on('create', () => {
        const roomId = (0, uuid_1.v4)();
        socket.join(roomId);
        db.set(socket.id, roomId);
        db.rPush(`room_admin-${roomId}`, socket.id);
        console.log(roomId);
        socket.emit('create', roomId);
    });
    socket.on('join', async (roomId) => {
        const lastRoom = await db.get(socket.id);
        if (lastRoom !== null)
            socket.leave(lastRoom);
        socket.join(roomId);
        db.set(socket.id, roomId);
        socket.emit('join', roomId);
    });
    async function checkAdminPermission(roomId) {
        const adminUsers = await db.lRange(`room_admin-${roomId}`, 0, await db.lLen(`room_admin-${roomId}`));
        return adminUsers.findIndex(val => socket.id === val) !== -1;
    }
    socket.on('play', async (data) => {
        if (!(await checkAdminPermission(data.roomId))) {
            socket.emit('error', {
                error: 'Cannot perform this action',
                cause: 'Not sufficient permission',
            });
            return;
        }
        io.to(data.roomId).emit('play', data);
    });
    socket.on('pause', async (data) => {
        if (!(await checkAdminPermission(data.roomId))) {
            socket.emit('error', {
                error: 'Cannot perform this action',
                cause: 'Not sufficient permission',
            });
            return;
        }
        io.to(data.roomId).emit('pause', data);
    });
};
exports.socketOnConnection = socketOnConnection;
//# sourceMappingURL=ws.js.map