import { ES1Value } from './ES1Value';

export class ES1Null extends ES1Value {
  protected representation!: null;

  static ES1Null(): ES1Null {
    return new ES1Null(null);
  }
}
