import { PhantomTypeParameter } from './PhantomTypeParameter';

export type MarkAsOpaqueType<T, _key extends string = 'OpaqueTypeTag'> = T & PhantomTypeParameter<_key, never>;