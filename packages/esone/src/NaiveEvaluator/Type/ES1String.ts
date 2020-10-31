import { ES1Value } from './ES1Value';

export class ES1String extends ES1Value {
  protected representation!: string;

  static ES1String(literal: string): ES1String {
    return new ES1String(literal);
  }
}
