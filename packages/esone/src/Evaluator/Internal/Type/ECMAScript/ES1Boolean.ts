import { ES1Type } from '../ES1Type';
import { constant, Lazy } from 'fp-ts/es6/function';
import { ES1Value } from '../../ES1Value';

export class ES1Boolean<Representation> extends ES1Type<Representation> {
  constructor(
    public readonly True: Lazy<Representation>,
    public readonly False: Lazy<Representation>,
  ) {
    super();
  }
}

export type AnyES1Boolean = <Result>(f: <R>(x: ES1Value<R, ES1Boolean<R>>) => Result) => Result
export function anyES1Boolean<R>(x: ES1Value<R, ES1Boolean<R>>): AnyES1Boolean {
  return f => f(x);
}

type Constant<Representation> = () => Representation;
type NaiveES1BooleanRepresentationCalculus<Representation> = [Constant<Representation>, Constant<Representation>]

class NaiveES1Boolean<Representation> extends ES1Boolean<Representation> {
  constructor(...[op1, op2]: NaiveES1BooleanRepresentationCalculus<Representation>) {
    super(op1, op2);
  }
}

export const es1Boolean: ES1Boolean<boolean> = new NaiveES1Boolean(constant(true), constant(false));
