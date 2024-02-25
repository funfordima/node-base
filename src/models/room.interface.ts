import { IUserRoom } from './user-room.interface';

export interface IRoom {
  roomId: number | string;
  roomUsers: IUserRoom[];
}
