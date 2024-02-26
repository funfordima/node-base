import { EWsCommand } from 'src/constants/ws-command.enum';
import { DbController } from 'src/controllers/db-controller';
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
        break;
      }

      case EWsCommand.CREATE_ROOM: {
        break;
      }

      case EWsCommand.ADD_USER_TO_ROOM:{
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
}
