import { EShipType } from '../constants/ship-type.enum';

export interface IShip {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: EShipType;
}
