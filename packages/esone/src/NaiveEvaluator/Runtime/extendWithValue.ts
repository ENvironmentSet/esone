import { ES1Value } from '../Type/ES1Value';
import { fold } from 'fp-ts/Option';
import { error, extend, Runtime } from './Runtime';
import { constant } from 'fp-ts/function';

export function extendWithValue<A extends ES1Value, B>(runtime: Runtime<A>, extender: (value: A) => Runtime<B>): Runtime<B> {
  return extend(runtime, fold(constant(error('value expected, but couldn\'t get anything')), extender));
}