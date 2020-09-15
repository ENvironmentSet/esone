import { ES1Type } from '../ES1Type';
import { constant, Lazy } from 'fp-ts/es6/function';
import { ES1Value } from '../../ES1Value';

export class ES1Null<Representation> extends ES1Type<Representation> {
  constructor(public readonly Null: Lazy<Representation>) {
    super();
  }
}

export type AnyES1Null = <Result>(f: <R>(x: ES1Value<R, ES1Null<R>>) => Result) => Result
export function anyES1Null<R>(x: ES1Value<R, ES1Null<R>>): AnyES1Null {
  return f => f(x);
}

type Constant<Representation> = () => Representation;
type NaiveES1NullRepresentationCalculus<Representation> = [Constant<Representation>]

class NaiveES1Null<Representation> extends ES1Null<Representation> {
  constructor(...[op1]: NaiveES1NullRepresentationCalculus<Representation>) {
    super(op1);
  }
}

export const es1Null: ES1Null<null> = new NaiveES1Null(constant(null));
