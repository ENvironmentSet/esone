import dropRightWhile from './dropRightWhile';
import { reverse } from 'fp-ts/lib/Array';
import { flow, Predicate } from 'fp-ts/lib/function';

export const dropLeftWhile: <A>(predicate: Predicate<A>) => (as: A[]) => A[] =
  <A>(predicate: Predicate<A>): (as: A[]) => A[] => flow(
    reverse,
    dropRightWhile(predicate)
  );

export default dropLeftWhile;
