import WebSocket from 'ws';

import { WSS_PORT } from 'src/constants/ports.constant';
import { Instruction } from 'src/models/instruction.model';
import { Application } from 'src/application/application';

export interface WebSocketClient extends WebSocket {
  id: number;
}

export class WsServer {
  private id = 0;
  private wss?: WebSocket.WebSocketServer;
  public clients: Map<number, WebSocketClient> = new Map();

  constructor(
    private app: Application,
  ) {}

  public init(port = WSS_PORT): void {
    this.wss = new WebSocket.WebSocketServer({ port });

    this.wss
      .on('connection', (client: WebSocketClient) => {
        client.id = this.id;
        this.clients.set(this.id, client);
        this.id += 1;

        client.on('message', (request: WebSocket.MessageEvent) => {
          const currentId = this.getKey(client);
          const payload = JSON.parse(`${request}`) as Instruction<unknown>;

          if (currentId) {
            this.app.handleMessage(currentId, payload);
          }
        });
      })
      .on('close', (event: WebSocket.CloseEvent) => console.log('Close connection:', this.getKey(event.target)))
      .on('error', (error) => console.log(error));
  }

  send(id: number, message: string): void {
    const client = this.clients.get(id);

    client?.send(message);
  }

  private getKey(client: WebSocket) {
    return [...this.clients.keys()].find((key) => this.clients.get(key) === client);
  }
}
