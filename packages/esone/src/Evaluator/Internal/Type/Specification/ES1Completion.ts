import { ES1Type } from '../ES1Type';
import { constant, Lazy } from 'fp-ts/es6/function';
import { singleton } from 'fp-ts/es6/Record';
import { AnyES1Value, ES1Value } from '../../ES1Value';

export class ES1Completion<Representation> extends ES1Type<Representation> {
  constructor(
    public readonly Normal: Lazy<Representation>,
    public readonly Break: Lazy<Representation>,
    public readonly Continue: Lazy<Representation>,
    public readonly Return: (x: AnyES1Value) => Representation,
    public readonly WithValue: (x: AnyES1Value, completion: Representation) => Representation,
  ) {
    super();
  }
}

export type AnyES1Completion = <Result>(f: <R, T extends ES1Completion<R>>(x: ES1Value<R, T>) => Result) => Result
export function anyES1Completion<R, T extends ES1Completion<R>>(x: ES1Value<R, T>): AnyES1Completion {
  return f => f(x);
}

type NaiveES1CompletionRepresentationCalculus<Representation> = [
  Lazy<Representation>,
  Lazy<Representation>,
  Lazy<Representation>,
  (x: AnyES1Value) => Representation,
  (x: AnyES1Value, completion: Representation) => Representation
]

class NaiveES1Completion<Representation> extends ES1Completion<Representation> {
  constructor(...[op1, op2, op3, op4, op5]: NaiveES1CompletionRepresentationCalculus<Representation>) {
    super(op1, op2, op3, op4, op5);
  }
}

type NaiveES1CompletionRepresentation =
  | { type: 'Normal' | 'Break' | 'Continue'; value?: AnyES1Value }
  | { type: 'Return'; value: AnyES1Value };

export const es1Completion: ES1Completion<NaiveES1CompletionRepresentation> =
  new NaiveES1Completion<NaiveES1CompletionRepresentation>(
    constant(singleton('type', 'Normal')),
    constant(singleton('type', 'Break')),
    constant(singleton('type', 'Continue')),
    value => ({ type: 'Return', value }),
    (value, { type }) => ({ type, value } as NaiveES1CompletionRepresentation)
  );