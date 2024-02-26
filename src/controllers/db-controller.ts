import { EWsCommand } from 'src/constants/ws-command.enum';
import { InstructionDto } from 'src/models/instruction.dto';
import { Instruction } from 'src/models/instruction.model';
import { IUserReg } from 'src/models/user-reg.interface';
import { IUserRoom } from 'src/models/user-room.interface';

export class DbController {
  users: IUserReg[] = [];

  reg(connectionId: number, user: IUserReg): Instruction<string> {
    let isError = false;
    let errorText = '';
    const currentUser = this.users.find((item) => item.name === user.name);

    if (!currentUser) {
        this.users.push({
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
      error: isError,
      errorText: errorText,
    };

    return new InstructionDto<IUserRoom>(EWsCommand.REG, currentUserData).mapDataToJson();
  }
}
