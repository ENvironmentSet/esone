import { Runtime, extend } from './Runtime';
import { constant } from 'fp-ts/function';
import { ES1Value } from '../Type/ES1Value';

export function compose<T>(a: Runtime<ES1Value>, b: Runtime<T>): Runtime<T> {
  return extend(a, constant(b));
}
