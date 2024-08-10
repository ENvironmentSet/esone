import { URI } from './URI';
import { map } from './map';
import { ap } from './ap';
import { of } from './of';
import { chain } from './chain';
import { Monad2 } from 'fp-ts/lib/Monad';

export * from './ap';
export * from './chain';
export * from './map';
export * from './nameFunction';
export * from './of';
export * from './URI';

export const func: Monad2<URI> = {
  URI,
  map,
  ap,
  of,
  chain,
};