import { ES1Value } from './ES1Value';
import { ES1String } from './ES1String';
import { Option, some } from 'fp-ts/Option';
import { lookup } from 'fp-ts/Map';
import { eqString } from 'fp-ts/Eq';

export class ES1PropertyRepresentation {
  constructor(
    public name: ES1String,
    public value: ES1Value,
    public writable: boolean = true,
    public enumerable: boolean = true,
    public deletable: boolean = true
  ) {}
}

export class ES1ObjectRepresentation {
  constructor(
    public properties: Map<string, ES1PropertyRepresentation> = new Map(),
    public wrapped?: ES1Value //@TODO: Option!!
  ) {}
}

export class ES1Object extends ES1Value {
  protected representation!: ES1ObjectRepresentation;

  static ES1Object(objectDescriptor: ES1ObjectRepresentation): ES1Object {
    return new ES1Object(objectDescriptor);
  }

  wrap(): Option<this> {
    return some(this);
  }

  get(propertyName: ES1Value): Option<ES1PropertyRepresentation> { //@TODO: Fix this
    return lookup(eqString)(propertyName.toString())(this.representation.properties);
  }
}
