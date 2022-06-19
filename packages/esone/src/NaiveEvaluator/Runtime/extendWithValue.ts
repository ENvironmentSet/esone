import { fold } from 'fp-ts/Option';
import { error, extend, Runtime } from './Runtime';
import { constant } from 'fp-ts/function';

export function extendWithValue<A, B>(runtime: Runtime<A>, extender: (value: A) => Runtime<B>): Runtime<B> {
  return extend(runtime, x => fold(constant(error('value expected, but couldn\'t get anything')), extender)(x));
}