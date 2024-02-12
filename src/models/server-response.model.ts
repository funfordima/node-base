import { ServerResponse } from 'http';

export interface CustomServerResponse extends ServerResponse {
  send(data: NonNullable<unknown>): void;
}
