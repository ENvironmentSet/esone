import { Runtime, extend } from './Runtime';
import { constant } from 'fp-ts/function';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';

export function compose(...runtimes: NonEmptyArray<Runtime>): Runtime {
  return runtimes.reduce((f, g) => extend(f, constant(g)));
}
