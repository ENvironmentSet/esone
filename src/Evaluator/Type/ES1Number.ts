import { ES1Value } from './ES1Value';
import { error, Runtime } from '../Runtime/Runtime';
import { ES1Primitive } from './ES1Primitive';
import { intro } from '../Runtime/intro';
import { ES1Boolean } from './ES1Boolean';
import { ES1String } from './ES1String';
import { ES1Object } from './ES1Object';

export class ES1Number extends ES1Value {
  declare protected representation: number;

  static ES1Number(literal: number): ES1Number {
    return new ES1Number(literal);
  }

  public toPrimitive(): Runtime<ES1Primitive> { return intro(this); }
  public toBoolean(): Runtime<ES1Boolean> { return intro(this.representation ? ES1Boolean.ES1True() : ES1Boolean.ES1False()); }
  public toNumber(): Runtime<ES1Number> { return intro(this); }
  public toString(): Runtime<ES1String> { return intro(ES1String.ES1String(String(this.representation))); }
  //@TODO
  public toObject(): Runtime<ES1Object> { return error('NotImplemented'); }

  public add(x: ES1Number) {
    return this.representation + x.representation;
  }

  public sub(x: ES1Number) {
    return this.representation - x.representation;
  }

  public mul(x: ES1Number) {
    return this.representation * x.representation;
  }

  public div(x: ES1Number) {
    return this.representation / x.representation;
  }

  public rem(x: ES1Number) {
    return this.representation % x.representation;
  }
}
