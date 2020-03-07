import { ES1Type } from '../ES1Type';
import { Lazy, constant } from 'fp-ts/es6/function';
import { AnyES1Value, ES1Value } from '../../ES1Value';

export class ES1List<Representation> extends ES1Type<Representation> {
  constructor(
    public readonly Empty: Lazy<Representation>,
    public readonly Cons: (head: AnyES1Value, tail: Representation) => Representation
  ) {
    super();
  }
}

export type AnyES1List = <Result>(f: <R, T extends ES1List<R>>(x: ES1Value<R, T>) => Result) => Result
export function anyES1List<R, T extends ES1List<R>>(x: ES1Value<R, T>): AnyES1List {
  return f => f(x);
}

type NaiveES1ListRepresentationCalculus<Representation> = [
  Lazy<Representation>,
  (head: AnyES1Value, tail: Representation) => Representation
]

class NaiveES1List<Representation> extends ES1List<Representation> {
  constructor(...[op1, op2]: NaiveES1ListRepresentationCalculus<Representation>) {
    super(op1, op2);
  }
}

export const es1List: ES1List<AnyES1Value[]> = new NaiveES1List<AnyES1Value[]>(
  constant([]),
  (head, tail) => [head, ...tail]
);