import { EWsCommand } from 'src/constants/ws-command.enum';
import { InstructionDto } from 'src/models/instruction.dto';
import { Instruction } from 'src/models/instruction.model';
import { IRoom } from 'src/models/room.interface';
import { IUserReg } from 'src/models/user-reg.interface';
import { IUserRoom } from 'src/models/user-room.interface';

export class DbController {
  private users: IUserRoom[] = [];
  private rooms: IRoom[] = [];

  reg(connectionId: number, user: IUserReg): Instruction<string> {
    let isError = false;
    let errorText = '';
    const currentUser = this.users.find((item) => item.name === user.name);

    if (!currentUser) {
        this.users.push({
          index: connectionId,
          name: user.name,
          password: user.password,
        });
    } else {
      if (currentUser.password !== user.password) {
        isError = true;
        errorText = 'Incorrect password.';
      }
    }

    const currentUserData: IUserRoom = {
      index: connectionId,
      name: user.name,
      password: user.password,
      error: isError,
      errorText: errorText,
    };

    return new InstructionDto<IUserRoom>(EWsCommand.REG, currentUserData).mapDataToJson();
  }

  createRoom(id: number): Instruction<string> {
    const currentRoom = this.rooms.find((item) => item.roomId === id);

    if (!currentRoom) {
      const currentUser = this.users.find((item) => item.index === id);

      if (!currentUser) {
        return new InstructionDto<IRoom[]>(EWsCommand.UPDATE_ROOM, this.rooms).mapDataToJson();
      }

      const roomData = {
        roomId: id,
        roomUsers: [
          {
            name: currentUser.name,
            index: currentUser.index,
            password: currentUser.password,
          },
        ],
      };

      this.rooms.push(roomData);
    }

    return new InstructionDto<IRoom[]>(EWsCommand.UPDATE_ROOM, this.rooms).mapDataToJson();
  }
}
