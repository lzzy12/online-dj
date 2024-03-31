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
