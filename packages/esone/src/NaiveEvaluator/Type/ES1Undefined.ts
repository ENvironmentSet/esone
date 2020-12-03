import { ES1Value } from './ES1Value';
import { ES1Object } from './ES1Object';
import { none, Option } from 'fp-ts/Option';

export class ES1Null extends ES1Value {
  protected representation!: undefined;

  static ES1Undefined(): ES1Null {
    return new ES1Null(undefined);
  }

  wrap(): Option<ES1Object> {
    return none;
  }
}
