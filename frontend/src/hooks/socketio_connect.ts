import { useContext, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {io, Socket} from 'socket.io-client';
import { roomState } from '../atoms/room';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/socket_context';

export const useSocketIO = () => {
  const [room, setRoom] = useRecoilState(roomState);
  const endpoint = 'ws://localhost:3001';
  const {socket, setSocket} = useContext(SocketContext);
  console.log('useSocket');
  const redirect = useNavigate();
  useEffect(() => {
    // Establish a connection to the Socket.IO server
    const socket = io(endpoint, {transports: ['websocket']});
    setSocket(socket);
  }, [endpoint]);

  socket?.on("connect", () => console.log("Connected"));
  const createRoom = () =>{
    setRoom({
      ...room,
      isWaitingForRoomId: true,
    })
    console.log("creating new room")
    socket?.emit("create");
  }

  socket?.on('create', (roomId: string) => {
    console.log(`room ${roomId} created`);
    setRoom({
      ...room,
      roomId,
      isWaitingForRoomId: false,
    });
    redirect('/music')
  })

  const joinRoom = (roomId: string) => {
    setRoom({
      ...room,
      isWaitingForRoomId: true,
    })
    socket?.emit('join', roomId);
  }

  socket?.on('join', (roomId: string) => {
    console.log(`Joined room ${roomId}`);
    setRoom({
      ...room,
      roomId,
      isWaitingForRoomId: false,
    });
    redirect('/music');
  })

  return {createRoom, joinRoom};
};
