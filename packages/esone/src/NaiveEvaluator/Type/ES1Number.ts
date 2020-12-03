import { ES1Value } from './ES1Value';
import { Option, some } from 'fp-ts/Option';
import { ES1Object } from './ES1Object';

export class ES1Number extends ES1Value {
  protected representation!: number;

  static ES1Number(literal: number): ES1Number {
    return new ES1Number(literal);
  }

  wrap(): Option<ES1Object> {
    return some(ES1Object.ES1Object({ properties: new Map(), wrapped: this }));
  }
}
