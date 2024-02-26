import { EWsCommand } from 'src/constants/ws-command.enum';
import { Instruction } from './instruction.model';

export class InstructionDto<T> extends Instruction<T> {
  constructor(type: EWsCommand, data: T) {
    super({ type, data });
  }

  mapDataToJson(): Instruction<string> {
    return {
      id: this.id,
      type: this.type,
      data: JSON.stringify(this.data),
    };
  }
}
