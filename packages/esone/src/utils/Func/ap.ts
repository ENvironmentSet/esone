import { Func } from './URI';

export function ap<E, A, B>(eab: Func<E, Func<A, B>>, ea: Func<E, A>): Func<E, B> {
  return (e: E): B => eab(e)(ea(e));
}