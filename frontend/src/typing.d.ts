export type PlayerAction = {
    songUrl: string;
    imageUrl?: string;
    provider: 'jio' | 'others';
    positionInSec?: number;
    roomId: string;
  };