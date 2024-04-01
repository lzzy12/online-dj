export type PlayerAction = {
  songUrl: string;
  imageUrl?: string;
  provider: 'jio' | 'others';
  positionInSec?: number;
  roomId: string;
};

export type ActionError = {
  message: string;
  cause: string;
};

export type MessageData = {
  message: string;
  roomId: string;
  nickname: string;
  id: string;
}