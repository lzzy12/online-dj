export type PlayerAction = {
  action: 'play' | 'pause' | 'resume' | 'next' | 'prev';
  assetUrl?: string;
  positionInSec?: number;
  roomId: string;
};

export type ActionError = {
  message: string;
  cause: string;
};
