export interface SongDetails {
    name: string;
    id: string;
    image: string;
    creators: string;
    srcUrl: string;
    provider: 'jio' | 'others';
}