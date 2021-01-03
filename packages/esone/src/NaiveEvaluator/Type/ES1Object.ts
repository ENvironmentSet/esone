import { ES1Value } from './ES1Value';
import { ES1String } from './ES1String';
import { Option, none, isSome } from 'fp-ts/Option';
import { Runtime } from '../Runtime/Runtime';
import { Immutable } from '../../utils/Immutable/Immutable';
import { ObjectId } from '../Runtime/Context';

export class ES1PropertyRepresentation extends Immutable {
  constructor(
    public name: ES1String,
    public value: ES1Value,
    public writable: boolean = true,
    public enumerable: boolean = true,
    public deletable: boolean = true
  ) {
    super();
  }
}

export class ES1ObjectRepresentation {
  constructor(
    public properties: Map<string, ES1PropertyRepresentation> = new Map(),
  ) {}
}

export class ES1Object extends ES1Value {
  protected representation!: ES1ObjectRepresentation;
  protected id: Option<ObjectId> = none;

  static ES1Object(objectDescriptor: ES1ObjectRepresentation): Runtime<ES1Object> {
    return context => context.introduceObject(new ES1Object(objectDescriptor));
  }

  public get isIntroduced() {
    return isSome(this.id);
  }

  public setId(id: ObjectId): ES1Object {
    return this.update({ id });
  }
}
