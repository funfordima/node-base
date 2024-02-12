import type { IncomingMessage } from 'http';

import { User } from './user.model';

export interface CustomClientRequest extends IncomingMessage {
  body?: User;
  pathName?: string;
}
