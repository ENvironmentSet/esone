import { ES1Value } from './ES1Value';

export class ES1Undefined extends ES1Value {
  protected representation!: undefined;

  static ES1Undefined(): ES1Undefined {
    return new ES1Undefined(undefined);
  }
}
