import { atom } from 'recoil';

export type MessageData = {
    message: string;
    roomId: string;
    nickname: string;
    id: string;
}
export type MessageState = {
    messages: MessageData[];
    userNickName?: string
}
export const chatAtom = atom<MessageState>({
    key: 'chatAtom',
    default: {messages: [], userNickName: 'Guest User'},
});