import { Methods } from './methods.model';

export interface Endpoint {
  [key: string]: Methods;
}
