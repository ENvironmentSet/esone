import { ES1Value } from './ES1Value';
import { ES1String } from './ES1String';
import { Option, none, isSome, fold, map, getOrElse } from 'fp-ts/Option';
import { Runtime } from '../Runtime/Runtime';
import { Immutable } from '../../utils/Immutable/Immutable';
import { ObjectId } from '../Runtime/Context';
import { deleteAt, insertAt, lookup, member } from 'fp-ts/Map';
import { ES1Undefined } from './ES1Undefined';
import { constant, pipe } from 'fp-ts/function';
import { ES1Null } from './ES1Null';

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

export class ES1ObjectRepresentation extends Immutable {
  constructor(
    public properties: Map<ES1String, ES1PropertyRepresentation> = new Map(),
    public prototype: ES1Object | ES1Null = ES1Null.ES1Null(), //Class, Value, DefaultValue
  ) {
    super();
  }
}

export class ES1Object extends ES1Value {
  protected representation!: ES1ObjectRepresentation;
  protected id: Option<ObjectId> = none;

  static ES1Object(objectDescriptor: ES1ObjectRepresentation): Runtime<ES1Object> {
    return context => context.introduceObject(new ES1Object(objectDescriptor));
  }

  private get prototype() {
    return this.representation.prototype;
  }

  public get isIntroduced() {
    return isSome(this.id);
  }

  public setId(id: ObjectId): ES1Object {
    return this.update({ id });
  }

  public has(propertyName: ES1String): boolean {
    return member(ES1String.eq)(propertyName, this.representation.properties);
  }

  public getPropertyReps(propertyName: ES1String): Option<ES1PropertyRepresentation> {
    return lookup(ES1String.eq)(propertyName, this.representation.properties);
  }

  public get(propertyName: ES1String): ES1Value {
    if (!this.has(propertyName) && this.prototype instanceof ES1Object)
      return this.prototype.get(propertyName);
    else
      return pipe(
        this.getPropertyReps(propertyName),
        fold(ES1Undefined.ES1Undefined, propertyRepresentation => propertyRepresentation.value)
      );
  }

  public put(propertyName: ES1String, value: ES1Value): ES1Object {
    if (!this.canPut(propertyName)) return this;
    else return pipe(
      this.getPropertyReps(propertyName),
      map(propertyReps => propertyReps.update({ value })),
      getOrElse(constant(new ES1PropertyRepresentation(propertyName, value))),
      propertyReps => insertAt(ES1String.eq)(propertyName, propertyReps),
      properties => this.update({ representation: this.representation.update({ properties }) })
    );
  }

  //@TODO: Add handle for host objects.
  public canPut(propertyName: ES1String): boolean {
    return pipe(
      this.getPropertyReps(propertyName),
      map(propertyReps => propertyReps.writable),
      getOrElse(() => this.prototype instanceof ES1Null || this.prototype.canPut(propertyName))
    );
  }

  public hasProperty(propertyName: ES1String): boolean {
    if (this.has(propertyName)) return true;
    else return this.prototype instanceof ES1Object && this.prototype.hasProperty(propertyName);
  }

  public delete(propertyName: ES1String): [boolean, this] {
    return pipe(
      this.getPropertyReps(propertyName),
      map(propertyReps => propertyReps.deletable ? deleteAt(ES1String.eq)(propertyName)(this.representation.properties) : this.representation.properties),
      map(properties => this.update({ properties })),
      fold(constant([true, this]), self => [!self.has(propertyName), self])
    )
  }

  //@TODO
  public defaultValue() {}
}
