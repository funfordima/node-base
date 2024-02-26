import { EWsCommand } from 'src/constants/ws-command.enum';
import { DbController } from 'src/controllers/db-controller';
import { IGameInit } from 'src/models/game-init.interface';
import { Instruction } from 'src/models/instruction.model';
import { IUserReg } from 'src/models/user-reg.interface';
import { WsServer } from 'src/ws-server';

export class Application {
  private wsServer: WsServer | null = null;
  private dbController: DbController | null = null;

  init(port: number): void {
    this.wsServer = new WsServer(this);
    this.dbController = new DbController();

   try {
    if (this.wsServer && this.dbController) {
      this.wsServer.init(port);

      console.log(`WSS connection has been started on port: ${port}`);
    }
   } catch (err) {
    console.error('WebSocket controller is not initialized properly.', err);
   }
  }

  handleMessage(clientId: number, body: Instruction<unknown>) {
    const { type, data } = body;

    switch (type) {
      case EWsCommand.REG: {
        this.reg(clientId, data as IUserReg);
        this.updateRoom();
        break;
      }

      case EWsCommand.CREATE_ROOM: {
        this.createRoom(clientId);
        this.updateRoom();
        break;
      }

      case EWsCommand.ADD_USER_TO_ROOM:{
        this.addUserToRoom(clientId, data as IGameInit);
        this.createGame(data as IGameInit);
        this.updateRoom();
        break;
      }

      case EWsCommand.ADD_SHIPS:{
        break;
      }

      case EWsCommand.ATTACK:{
        break;
      }

      case EWsCommand.RANDOM_ATTACK:{
        break;
      }
    }
  }

  reg(connectionId: number, user: IUserReg) {
    const response = this.dbController?.reg(connectionId, user);
    
    this.wsServer?.send(connectionId, JSON.stringify(response));
  }

  createRoom(connectionId: number) {
    const response = this.dbController?.createRoom(connectionId);
    this.wsServer?.send(connectionId, JSON.stringify(response));
  }

  addUserToRoom(connectionId: number, data: IGameInit) {
    const response = this.dbController?.addUserToRoom(connectionId, data);

    this.wsServer?.send(connectionId, JSON.stringify(response));
  }

  updateRoom(users: 'all' | string[] = 'all') {
    if (users === 'all') {
      this.wsServer?.clients.forEach((client) => {
        client.send(JSON.stringify(this.dbController?.updateRooms()));
      });
    }
  }

  createGame(data: IGameInit) {
    const response = this.dbController?.createGame(data);
    const currentRoom = this.dbController?.rooms.find((room) => room.roomId === data.indexRoom);

    if (currentRoom) {
      currentRoom.roomUsers.forEach((user) => {
        const client = this.wsServer?.clients.get(+user.index);

        client?.send(JSON.stringify(response));
      });
    }
  }
}
