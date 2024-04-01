import { useContext, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {io} from 'socket.io-client';
import { roomAtom } from '../atoms/room';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/socket_context';
import 'react-toastify/dist/ReactToastify.css';
import { musicAtom } from '../atoms/music';

export const useSocketIO = () => {
  const [room, setRoom] = useRecoilState(roomAtom);
  const endpoint = 'ws://localhost:3001';
  const {socket, setSocket} = useContext(SocketContext);
  console.log('useSocket');
  const redirect = useNavigate();
  const [musicState] = useRecoilState(musicAtom)
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
  const [room] = useRecoilState(roomAtom);
  const {socket} = useContext(SocketContext);
  const redirect = useNavigate();
  useEffect(() => {
    if (!room || !room.roomId || !socket || !socket.connected){
      redirect('/');
    }
  }, [room, socket, socket?.connected])
}