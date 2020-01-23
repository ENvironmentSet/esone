export function nameFunction<F extends (...args: any[]) => any>(name: string, f: F): F {
  const { [name]: derived } = { [name]: (...args: Parameters<F>): ReturnType<F> => f(...args) };

  return derived as F;
}