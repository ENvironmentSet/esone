import { ES1Value } from './ES1Value';
import { intro } from '../Runtime/intro';
import { ES1Number } from './ES1Number';
import { Runtime } from '../Runtime/Runtime';
import { ES1Primitive } from './ES1Primitive';
import { ES1String } from './ES1String';
import { ES1Object } from './ES1Object';
import { error } from '../Runtime/Runtime';

export class ES1Boolean extends ES1Value {
  declare protected representation: boolean;

  static ES1True(): ES1Boolean {
    return new ES1Boolean(true);
  }

  static ES1False(): ES1Boolean {
    return new ES1Boolean(false);
  }

  public toPrimitive(): Runtime<ES1Primitive> { return intro(this); }
  public toBoolean(): Runtime<ES1Boolean> { return intro(this); }
  public toNumber(): Runtime<ES1Number> { return intro(ES1Number.ES1Number(this.representation ? 1 : 0)); }
  public toString(): Runtime<ES1String> { return intro(ES1String.ES1String(this.representation ? 'true' : 'false')); }
  //@TODO
  public toObject(): Runtime<ES1Object> { return error('NotImplemented'); }
}