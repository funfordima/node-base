import { WebSocketServer } from 'ws';

import { WS_PORT } from '../constants/ports.constant';

export const wsServer = new WebSocketServer({ port: WS_PORT });
