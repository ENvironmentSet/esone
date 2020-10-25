import { ES1Value } from './ES1Value';
import { Environment, ES1ObjectReference } from '../Program/Environment';
import { map } from 'fp-ts/State';
import { pipe } from 'fp-ts/function';

interface ES1PropertyRepresentation {
  name: string;
  value: ES1Value;
  writable: boolean;
  enumerable: boolean;
  deletable: boolean;
}

export interface ES1ObjectRepresentation { // In Acropolis, State of object is treated as environment
  properties: Set<ES1PropertyRepresentation>;
  //internal things goes here
}

export class ES1Object extends ES1Value {
  protected representation!: ES1ObjectReference;

  static equals(a: ES1Object, b: ES1Object) {
    return a.representation === b.representation;
  }

  static Object(objectDescriptor: ES1ObjectRepresentation): (environment: Environment) => [ES1Object, Environment] {
    return pipe(
      Environment.createObject(objectDescriptor),
      map(objectReference => new ES1Object(objectReference))
    );
  }
}
