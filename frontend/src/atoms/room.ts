import { atom } from "recoil";
export type RoomState = {
    roomId: string | null,
    isWaitingForRoomId: boolean,
}
export const roomState = atom<RoomState>({
    key: 'room-atom',
    default: {
        roomId: null,
        isWaitingForRoomId: false,
    }
})