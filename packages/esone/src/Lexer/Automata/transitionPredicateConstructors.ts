import { transitionPredicate } from './Transition';
import { constTrue, constFalse, not } from 'fp-ts/lib/function';
import { map } from 'fp-ts/lib/Array';

export const or: (...predicates: transitionPredicate[]) => transitionPredicate =
  (...predicates) => char => predicates.some(predicates => predicates(char));
export const and: (...predicates: transitionPredicate[]) => transitionPredicate =
  (...predicates) => char => predicates.every(predicates => predicates(char));
export const any: transitionPredicate = constTrue;
export const nothing: transitionPredicate = constFalse;
export { not };
export const equals: (char: string) => transitionPredicate = x => y => x === y;
export const oneOf: (...chars: string[]) => transitionPredicate = (...chars) => or(...map(equals)(chars));
export const alphabet: transitionPredicate = oneOf(
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
);
export const digit: transitionPredicate = oneOf('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

export default {
  or,
  and,
  any,
  nothing,
  not,
  equals,
  oneOf,
  alphabet,
  digit,
};