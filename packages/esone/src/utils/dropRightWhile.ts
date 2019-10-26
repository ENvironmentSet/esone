import { Predicate } from 'fp-ts/lib/function';
import { reduceRight, cons, isEmpty } from 'fp-ts/lib/Array';

export function dropRightWhile<A>(predicate: Predicate<A>): (as: A[]) => A[] {
  return reduceRight(
    [],
    (current: A, left: A[]): A[] => isEmpty(left) && predicate(current) ? left : cons(current, left)
  );
}

export default dropRightWhile;
