import { Runtime, extend, empty } from './Runtime';
import { constant } from 'fp-ts/function';

export function compose(...runtimes: Array<Runtime>): Runtime {
  return runtimes.reduce((f, g) => extend(f, constant(g)), empty);
}
