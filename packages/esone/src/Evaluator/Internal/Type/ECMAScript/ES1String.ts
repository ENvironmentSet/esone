import { ES1Type } from '../ES1Type';
import { identity } from 'fp-ts/es6/function';
import { ES1Value } from '../../ES1Value';

export class ES1String<Representation> extends ES1Type<Representation> {
  constructor(public readonly FromLiteral: (x: string) => Representation) {
    super();
  }
}

export type AnyES1String = <Result>(f: <R>(x: ES1Value<R, ES1String<R>>) => Result) => Result
export function anyES1String<R>(x: ES1Value<R, ES1String<R>>): AnyES1String {
  return f => f(x);
}

type NaiveES1StringRepresentationCalculus<Representation> = [(x: string) => Representation]

class NaiveES1String<Representation> extends ES1String<Representation> {
  constructor(...[op1]: NaiveES1StringRepresentationCalculus<Representation>) {
    super(op1);
  }
}

export const es1String: ES1String<string> = new NaiveES1String(identity);
