import { ES1Value } from './ES1Value';

export class ES1Number extends ES1Value {
  protected representation!: number;

  static ES1Number(literal: number): ES1Number {
    return new ES1Number(literal);
  }
}
