import { ES1Value } from '../Type/ES1Value';
import { empty, lift, Runtime } from './Runtime';
import { some } from 'fp-ts/Option';
import { constant, pipe } from 'fp-ts/function';

export function intro<T extends ES1Value>(value: T): Runtime<T> {
  return pipe(
    empty<T>(),
    lift(constant(some(value)))
  );
}