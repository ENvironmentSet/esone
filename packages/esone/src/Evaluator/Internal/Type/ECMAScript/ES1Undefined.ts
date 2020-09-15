import { ES1Type } from '../ES1Type';
import { constant, Lazy } from 'fp-ts/es6/function';
import { ES1Value } from '../../ES1Value';

export class ES1Undefined<Representation> extends ES1Type<Representation> {
  constructor(public readonly Undefined: Lazy<Representation>) {
    super();
  }
}

export type AnyES1Undefined = <Result>(f: <R>(x: ES1Value<R, ES1Undefined<R>>) => Result) => Result
export function anyES1Undefined<R>(x: ES1Value<R, ES1Undefined<R>>): AnyES1Undefined {
  return f => f(x);
}

type Constant<Representation> = () => Representation;
type NaiveES1UndefinedRepresentationCalculus<Representation> = [Constant<Representation>]

class NaiveES1Undefined<Representation> extends ES1Undefined<Representation> {
  constructor(...[op1]: NaiveES1UndefinedRepresentationCalculus<Representation>) {
    super(op1);
  }
}

export const es1Undefined: ES1Undefined<undefined> = new NaiveES1Undefined(constant(undefined));
