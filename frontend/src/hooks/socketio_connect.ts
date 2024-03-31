import { useContext, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {io, Socket} from 'socket.io-client';
import { roomState } from '../atoms/room';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/socket_context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlayerAction } from '../typing';
import { useMusic } from './useMusic';
import { musicAtom } from '../atoms/music';

export const useSocketIO = () => {
  const [room, setRoom] = useRecoilState(roomState);
  const endpoint = 'ws://localhost:3001';
  const {socket, setSocket} = useContext(SocketContext);
  console.log('useSocket');
  const redirect = useNavigate();
  const {changeMusic, pause, resume: resumeMusic, togglePlay} = useMusic()
  const [musicState, setMusicState] = useRecoilState(musicAtom)
  useEffect(() => {
    // Establish a connection to the Socket.IO server
    const socket = io(endpoint, {transports: ['websocket']});
    setSocket(socket);
  }, [endpoint]);

 

  useEffect(() => {
    socket?.on("connect", () => console.log("Connected"));
    socket?.on('create', (roomId: string) => {
      console.log(`room ${roomId} created`);
      setRoom({
        ...room,
        roomId,
        isWaitingForRoomId: false,
        isAdmin: true,
      });
      redirect('/music')
    })

    socket?.on('join', (roomId: string) => {
      console.log(`Joined room ${roomId}`);
      setRoom({
        ...room,
        roomId,
        isWaitingForRoomId: false,
        isAdmin: false,
      });
      redirect('/music');
    })
    return () => {
      socket?.offAny()
    }
  }, [socket, room.roomId, musicState])

 const createRoom = () =>{
    setRoom({
      ...room,
      isWaitingForRoomId: true,
    })
    console.log("creating new room")
    socket?.emit("create");
  }

  const joinRoom = (roomId: string) => {
    setRoom({
      ...room,
      isWaitingForRoomId: true,
    })
    socket?.emit('join', roomId);
  }

  

  
  return {createRoom, joinRoom};
};


export const useCheckRoomJoined = () => {
  const [room] = useRecoilState(roomState);
  const {socket} = useContext(SocketContext);
  const redirect = useNavigate();
  useEffect(() => {
    if (!room || !room.roomId || !socket || !socket.connected){
      redirect('/');
    }
  }, [room, socket, socket?.connected])
}