import { ES1Type } from '../ES1Type';
import { AnyES1Object } from '../ECMAScript';
import { ES1Value } from '../../ES1Value';

export class ES1Reference<Representation> extends ES1Type<Representation> {
  constructor(
    public readonly makeReference: (baseObject: AnyES1Object, propertyName: string) => Representation
  ) {
    super();
  }
}

export type AnyES1Reference = <Result>(f: <R, T extends ES1Reference<R>>(x: ES1Value<R, T>) => Result) => Result
export function anyES1Reference<R, T extends ES1Reference<R>>(x: ES1Value<R, T>): AnyES1Reference {
  return f => f(x);
}

type NaiveES1ListRepresentationCalculus<Representation> = [
  (baseObject: AnyES1Object, propertyName: string) => Representation
]

class NaiveES1Reference<Representation> extends ES1Reference<Representation> {
  constructor(...[op1]: NaiveES1ListRepresentationCalculus<Representation>) {
    super(op1);
  }
}

class NaiveES1ReferenceRepresentation {
  constructor(public readonly baseObject: AnyES1Object, public readonly propertyName: string) {}
}

export const es1Reference: ES1Reference<NaiveES1ReferenceRepresentation> = new NaiveES1Reference(
  (baseObject, propertyName) => new NaiveES1ReferenceRepresentation(baseObject, propertyName)
);