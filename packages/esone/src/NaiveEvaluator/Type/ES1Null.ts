import { ES1Value } from './ES1Value';
import { none, Option } from 'fp-ts/Option';
import { ES1Object } from './ES1Object';

export class ES1Null extends ES1Value {
  protected representation!: null;

  static ES1Null(): ES1Null {
    return new ES1Null(null);
  }

  wrap(): Option<ES1Object> {
    return none;
  }
}
