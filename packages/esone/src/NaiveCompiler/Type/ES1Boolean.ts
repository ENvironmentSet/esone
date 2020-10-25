import { ES1Value } from './ES1Value';

export class ES1Boolean extends ES1Value {
  protected representation!: boolean;

  static ES1True(): ES1Boolean {
    return new ES1Boolean(true);
  }

  static ES1False(): ES1Boolean {
    return new ES1Boolean(false);
  }
}
