import { ES1Value } from './ES1Value';
import { Eq } from 'fp-ts/Eq';
import { error, Runtime } from '../Runtime/Runtime';
import { ES1Primitive } from './ES1Primitive';
import { intro } from '../Runtime/intro';
import { ES1Boolean } from './ES1Boolean';
import { ES1Number } from './ES1Number';
import { ES1Object } from './ES1Object';

export class ES1String extends ES1Value {
  declare protected representation: string;

  static ES1String(literal: string): ES1String {
    return new ES1String(literal);
  }

  static eq: Eq<ES1String> = {
    equals({ representation: rep1 }, { representation: rep2 }): boolean {
      return rep1 === rep2;
    }
  };

  public toPrimitive(): Runtime<ES1Primitive> { return intro(this); }
  public toBoolean(): Runtime<ES1Boolean> { return intro(Boolean(this.representation) ? ES1Boolean.ES1True() : ES1Boolean.ES1False()); }
  public toNumber(): Runtime<ES1Number> { return intro(ES1Number.ES1Number(Number(this.representation))); }
  public toString(): Runtime<ES1String> { return intro(this); }
  //@TODO
  public toObject(): Runtime<ES1Object> { return error('NotImplemented'); }
}
