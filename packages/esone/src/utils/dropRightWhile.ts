import { Predicate, flow } from 'fp-ts/lib/function';
import { dropLeftWhile, reverse } from 'fp-ts/lib/Array';

export const dropRightWhile: <A>(predicate: Predicate<A>) => (xs: A[]) => A[] =
  <A>(predicate: Predicate<A>): (xs: A[]) => A[] => flow(
    reverse,
    dropLeftWhile(predicate)
  );

export default dropRightWhile;
