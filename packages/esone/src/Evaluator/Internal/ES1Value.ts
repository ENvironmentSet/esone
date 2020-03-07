import { ES1Type } from './Type';

export class ES1Value<R, T extends ES1Type<R>> {
  public constructor(
    public readonly type: T,
    public readonly representation: R
  ) {}
}

export type AnyES1Value = <Result>(f: <R, T extends ES1Type<R>>(x: ES1Value<R, T>) => Result) => Result
export function anyES1Value<R, T extends ES1Type<R>>(x: ES1Value<R, T>): AnyES1Value {
  return f => f(x);
}