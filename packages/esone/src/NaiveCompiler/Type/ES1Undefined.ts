import { ES1Value } from './ES1Value';

export class ES1Null extends ES1Value {
  protected representation!: undefined;

  static ES1Undefined(): ES1Null {
    return new ES1Null(undefined);
  }
}
