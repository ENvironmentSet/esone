import { ES1Boolean } from './ES1Boolean';
import { ES1Null } from './ES1Null';
import { ES1Number } from './ES1Number';
import { ES1Object } from './ES1Object';
import { ES1String } from './ES1String';
import { ES1Undefined } from './ES1Undefined';
import { ES1Value } from '../../ES1Value';

export * from './ES1Boolean';
export * from './ES1Null';
export * from './ES1Number';
export * from './ES1Object';
export * from './ES1String';
export * from './ES1Undefined';
export type ES1LanguageType<Representation> =
  | ES1Boolean<Representation>
  | ES1Null<Representation>
  | ES1Number<Representation>
  | ES1Object<Representation>
  | ES1String<Representation>
  | ES1Undefined<Representation>
export type AnyES1LanguageType = <Result>(f: <R, T extends ES1LanguageType<R>>(x: ES1Value<R, T>) => Result) => Result
export function anyES1LanguageType<R, T extends ES1LanguageType<R>>(x: ES1Value<R, T>): AnyES1LanguageType {
  return f => f(x);
}