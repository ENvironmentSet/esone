import { ES1Type } from '../ES1Type';
import { ES1Value } from '../../ES1Value';

export class ES1Number<Representation> extends ES1Type<Representation> {
  constructor(public readonly FromLiteral: (x: string) => Representation) {
    super();
  }
}

export type AnyES1Number = <Result>(f: <R, T extends ES1Number<R>>(x: ES1Value<R, T>) => Result) => Result
export function anyES1Number<R, T extends ES1Number<R>>(x: ES1Value<R, T>): AnyES1Number {
  return f => f(x);
}

type NaiveES1NumberRepresentationCalculus<Representation> = [(x: string) => Representation]

class UnsafeES1Number<Representation> extends ES1Number<Representation> {
  constructor(...[op1]: NaiveES1NumberRepresentationCalculus<Representation>) {
    super(op1);
  }
}

export const es1Number: ES1Number<number> = new UnsafeES1Number(Number);