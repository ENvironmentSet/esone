import { ES1Type } from '../ES1Type';
import { AnyES1Value, ES1Value } from '../../ES1Value';
import { constant } from 'fp-ts/es6/function';

export class ES1Object<Representation> extends ES1Type<Representation> {
  constructor(
    public readonly Empty: () => Representation,
    public readonly AddProperty: (es1object: Representation, property: ES1Property) => Representation,
    public readonly RemoveProperty: (es1object: Representation, property: ES1Property['name']) => Representation
  ) {
    super();
  }
}

export type AnyES1Object = <Result>(f: <R>(x: ES1Value<R, ES1Object<R>>) => Result) => Result
export function anyES1Object<R>(x: ES1Value<R, ES1Object<R>>): AnyES1Object {
  return f => f(x);
}

type NaiveES1ObjectRepresentationCalculus<Representation> = [
  () => Representation,
  (es1object: Representation, property: ES1Property) => Representation,
  (es1object: Representation, property: ES1Property['name']) => Representation
]

class NaiveES1Object<Representation> extends ES1Object<Representation> {
  constructor(...[op1, op2, op3]: NaiveES1ObjectRepresentationCalculus<Representation>) {
    super(op1, op2, op3);
  }
}

export class ES1PropertyAttributes {
  constructor(
    public readonly ReadOnly: boolean,
    public readonly DontDelete: boolean,
    public readonly DontEnum: boolean,
    public readonly Internal: boolean,
  ) {}
}

export class ES1Property {
  constructor(
    public readonly name: string,
    public readonly value: AnyES1Value,
    public readonly attributes: ES1PropertyAttributes
  ) {}
}

type NaiveES1ObjectRepresentation = ES1Property[];

export const es1Object: ES1Object<NaiveES1ObjectRepresentation> = new NaiveES1Object<NaiveES1ObjectRepresentation>(
  constant([]),
  (object, property) => object.concat(property),
  (object, targetName) => object.filter(({ name }) => name !== targetName),
);
