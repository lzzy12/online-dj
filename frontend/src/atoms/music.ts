import { atom } from "recoil";

export type Music = {
    srcUrl: string,
    image: string,
    provider: 'jio' | 'others'
}
export type MusicState = {
    queue: Music[];
    currentMusic: Music | null;
    durationInSecs: number | null;
    positionInSecs: number | null;
    volume: number;
    muted: boolean;
    playing: boolean;
    loaded: boolean;
    sliding: boolean
}

export const musicAtom = atom<MusicState>({
    key: 'music-state',
    default: {
        queue: [],
        currentMusic: null,
        durationInSecs: null,
        positionInSecs: null,
        volume: 0.8,
        muted: false,
        playing: false,
        loaded: true,
        sliding: false,
    }
})