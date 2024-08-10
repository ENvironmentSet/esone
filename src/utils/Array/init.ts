export function init<A>(x: Array<A>): Array<A> {
  return x.slice(0, x.length - 1);
}