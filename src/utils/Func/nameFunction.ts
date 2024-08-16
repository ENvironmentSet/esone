export function nameFunction<P extends unknown[], R>(name: string, f: (...args: P) => R): (...args: P) => R {
  const { [name]: derived } = { [name]: (...args: P): R => f(...args) };

  return derived;
}