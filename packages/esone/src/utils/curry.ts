//@TODO Enhance typing with type-level programming

export function curry(f: Function): Function {
  function unsafeSetFunctionLength(f: Function, length: number) {
    return Object.defineProperty(f, 'length', { value: length });
  }

  if (f.length <= 1) return f;
  else return (a: unknown) => curry(unsafeSetFunctionLength((...args: unknown[]) => f(a, ...args), f.length - 1));
}

export default curry;