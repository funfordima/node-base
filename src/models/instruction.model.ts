import { EWsCommand } from '../constants/ws-command.enum';

export class Instruction<T> {
  constructor(
    opt: Partial<Instruction<T>> = {},
    public type: EWsCommand = opt.type ?? EWsCommand.REG,
    public id: number = 0,
    public data: T = opt.data ?? {} as T,
  ) {}
}
