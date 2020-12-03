import { ES1Value } from './ES1Value';
import { Option, some } from 'fp-ts/Option';
import { ES1Object } from './ES1Object';

export class ES1String extends ES1Value {
  protected representation!: string;

  static ES1String(literal: string): ES1String {
    return new ES1String(literal);
  }

  wrap(): Option<ES1Object> {
    return some(ES1Object.ES1Object({ properties: new Map(), wrapped: this }));
  }

  toString() {
    return this.representation;
  }
}
