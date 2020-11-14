import { ES1Value } from './ES1Value';

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
  protected representation!: ES1ObjectRepresentation;

  static Object(objectDescriptor: ES1ObjectRepresentation): ES1Object {
    return new ES1Object(objectDescriptor);
  }
}
