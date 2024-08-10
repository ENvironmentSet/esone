import { empty, lift, Runtime } from './Runtime';
import { some } from 'fp-ts/Option';
import { constant, pipe } from 'fp-ts/function';

export function intro<T>(value: T): Runtime<T> {
  return pipe(
    empty<T>(),
    lift(constant(some(value)))
  );
}