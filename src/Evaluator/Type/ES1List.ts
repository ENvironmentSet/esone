import { ES1Value } from './ES1Value';
import { error, Runtime } from '../Runtime/Runtime';
import { ES1Primitive } from './ES1Primitive';
import { ES1Boolean } from './ES1Boolean';
import { ES1Number } from './ES1Number';
import { ES1String } from './ES1String';
import { ES1Object } from './ES1Object';

type ES1ListRepresentation = ES1Value[];

export class ES1List extends ES1Value {
  declare protected representation: ES1ListRepresentation;

  static ES1List(...representation: ES1ListRepresentation): ES1List {
    return new ES1List(representation);
  }

  public [Symbol.iterator]() {
    return this.representation[Symbol.iterator]();
  }

  public toPrimitive(): Runtime<ES1Primitive> { return error('Not Supported'); }
  public toBoolean(): Runtime<ES1Boolean> { return error('Not Supported'); }
  public toNumber(): Runtime<ES1Number> { return error('Not Supported'); }
  public toString(): Runtime<ES1String> { return error('Not Supported'); }
  public toObject(): Runtime<ES1Object> { return error('Not Supported'); }
}
