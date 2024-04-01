import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { MessageData, chatAtom } from '../atoms/chat';
import { SocketContext } from '../context/socket_context';
import { roomAtom } from '../atoms/room';

const useChat = () => {
    const [messages, setMessages] = useRecoilState(chatAtom);
    const { socket } = useContext(SocketContext);
    const [room] = useRecoilState(roomAtom);

    useEffect(() => {
        socket?.off('message');
        socket?.on('message', (message: MessageData) => {
            setMessages((prev) => { return { ...prev, messages: [...prev.messages, message] } });
        });

        return () => {
            socket?.offAny();
        };
    }, [socket]);

    const sendMessage = (message: string) => {
        socket?.emit('message', {
            message: message,
            nickname: messages.userNickName ?? 'User',
            roomId: room.roomId,
        } as MessageData);
        setMessages((prev) => {
            return {
                ...prev, messages: [...prev.messages,
                {
                    id: socket?.id,
                    message: message,
                    nickname: messages.userNickName,
                    roomId: room.roomId,
                } as MessageData]
            }
        });
    }
    return { messages, sendMessage };
};

export default useChat;