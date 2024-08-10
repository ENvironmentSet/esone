import { Func } from './URI';

export function chain<E, A, B>(ea: Func<E, A>, aeb: Func<A, Func<E, B>>): Func<E, B> {
  return (e: E): B => aeb(ea(e))(e);
}