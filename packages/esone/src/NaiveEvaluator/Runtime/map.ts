import { lift, Runtime } from './Runtime';
import { map as optionMap } from 'fp-ts/es6/Option';
import { ES1Value } from '../Type/ES1Value';

export function map<A extends ES1Value, B>(f: (value: A) => B): (runtime: Runtime<A>) => Runtime<B> {
  return lift(optionMap(f));
}