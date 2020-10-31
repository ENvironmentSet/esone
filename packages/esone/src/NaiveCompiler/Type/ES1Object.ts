import { ES1Value } from './ES1Value';
import { Context, ES1ObjectReference } from '../Runtime/Context';
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

  static Object(objectDescriptor: ES1ObjectRepresentation): (environment: Context) => [ES1Object, Context] {
    return pipe(
      Context.createObject(objectDescriptor),
      map(objectReference => new ES1Object(objectReference))
    );
  }
}
