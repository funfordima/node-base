import { IGameInit } from './game-init.interface';

export interface IGame {
  idGame: number;
  hostId: number;
  clientId: number;
  data: IGameInit[];
  isOnline: boolean;
  turn?: number;
}
