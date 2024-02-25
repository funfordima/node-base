import { Instruction } from './instruction.model';

export class InstructionDto<T> extends Instruction<T> {
  constructor() {
    super();
  }

  mapDataToJson(): Instruction<string> {
    return {
      id: this.id,
      type: this.type,
      data: JSON.stringify(this.data),
    };
  }
}
