import { ES1Value } from './ES1Value';
import { ES1String } from './ES1String';
import { BindingId, ScopeId } from '../Runtime/Context';
import { empty, error, Runtime } from '../Runtime/Runtime';
import { chain, map, getOrElse, fold } from 'fp-ts/Option';
import { constant, identity, pipe } from 'fp-ts/function';
import { intro } from '../Runtime/intro';
import { extendWithValue } from '../Runtime/extendWithValue';
import { compose } from '../Runtime/compose';
import { ES1Primitive } from './ES1Primitive';
import { ES1Boolean } from './ES1Boolean';
import { ES1Number } from './ES1Number';
import { ES1Object } from './ES1Object';

type ES1ReferenceRepresentation = ES1PropertyReferenceRepresentation | ES1BindingReferenceRepresentation;

interface ES1PropertyReferenceRepresentation {
  base: ES1Value;
  referencedBinding: ES1String;
}

interface ES1BindingReferenceRepresentation {
  base: ScopeId;
  referencedBinding: BindingId;
}

export class ES1Reference extends ES1Value {
  protected representation!: ES1ReferenceRepresentation;

  static ES1Reference(representation: ES1ReferenceRepresentation): ES1Reference {
    return new ES1Reference(representation);
  }

  public get base(): ES1ReferenceRepresentation['base'] {
    return this.representation.base;
  }

  public get referencedBinding(): ES1ReferenceRepresentation['referencedBinding'] {
    return this.representation.referencedBinding;
  }

  public getValue(): Runtime<ES1Value> {
    if (this.base instanceof ES1Value) {
      return extendWithValue(
        this.base.toObject(),
        baseObject => intro(baseObject.get(this.referencedBinding as ES1String))
      );
    } else return context => cont => pipe(
      context.getScope(this.base as ScopeId),
      chain(scope => scope.ref(this.referencedBinding as BindingId, context)),
      map(intro),
      getOrElse(constant(error('unresolvable binding'))),
      runtime => runtime(context)(identity),
      cont
    )
  }

  //@TODO: Global fallback support
  public putValue<T>(value: ES1Value): Runtime<T> {
    if (this.base instanceof ES1Value) {
      return extendWithValue(
        this.base.toObject(),
        baseObject => compose(
          intro(baseObject.put(this.referencedBinding as ES1String, value)),
          empty<T>()
        )
      );
    } else return context => pipe(
      context.modifyScope(this.base as ScopeId, scope => scope.set(value, this.referencedBinding as BindingId, context)),
      fold(() => error<T>('Can\'t set value')(context), empty<T>()),
    )
  }

  public toPrimitive(): Runtime<ES1Primitive> { return error('Not Supported'); }
  public toBoolean(): Runtime<ES1Boolean> { return error('Not Supported'); }
  public toNumber(): Runtime<ES1Number> { return error('Not Supported'); }
  public toString(): Runtime<ES1String> { return error('Not Supported'); }
  public toObject(): Runtime<ES1Object> { return error('Not Supported'); }
}