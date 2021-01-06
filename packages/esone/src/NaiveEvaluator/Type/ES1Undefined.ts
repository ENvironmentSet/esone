import { ES1Value } from './ES1Value';
import { error, Runtime } from '../Runtime/Runtime';
import { ES1Primitive } from './ES1Primitive';
import { intro } from '../Runtime/intro';
import { ES1Boolean } from './ES1Boolean';
import { ES1Number } from './ES1Number';
import { ES1String } from './ES1String';
import { ES1Object } from './ES1Object';

export class ES1Undefined extends ES1Value {
  protected representation!: undefined;

  static ES1Undefined(): ES1Undefined {
    return new ES1Undefined(undefined);
  }

  public toPrimitive(): Runtime<ES1Primitive> { return intro(this); }
  public toBoolean(): Runtime<ES1Boolean> { return intro(ES1Boolean.ES1False()); }
  public toNumber(): Runtime<ES1Number> { return intro(ES1Number.ES1Number(NaN)); }
  public toString(): Runtime<ES1String> { return intro(ES1String.ES1String('undefined')); }
  public toObject(): Runtime<ES1Object> { return error('Not supported'); }
}
