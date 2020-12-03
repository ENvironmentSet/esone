import { ES1Value } from './ES1Value';
import { ES1Object } from './ES1Object';
import { Option, some } from 'fp-ts/Option';

export class ES1Boolean extends ES1Value {
  protected representation!: boolean;

  static ES1True(): ES1Boolean {
    return new ES1Boolean(true);
  }

  static ES1False(): ES1Boolean {
    return new ES1Boolean(false);
  }

  wrap(): Option<ES1Object> {
    return some(ES1Object.ES1Object({ properties: new Map(), wrapped: this }));
  }
}