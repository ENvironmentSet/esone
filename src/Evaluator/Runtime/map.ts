import { lift, Runtime } from './Runtime';
import { map as optionMap } from 'fp-ts/es6/Option';

export function map<A, B>(f: (value: A) => B): (runtime: Runtime<A>) => Runtime<B> {
  return lift(optionMap(f));
}