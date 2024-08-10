import { Runtime, extend } from './Runtime';
import { constant } from 'fp-ts/function';

export function compose<T, K>(a: Runtime<K>, b: Runtime<T>): Runtime<T> {
  return extend(a, constant(b));
}
