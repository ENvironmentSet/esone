import { ES1Value } from '../Type/ES1Value';
import { init, NonEmptyArray, snoc, head } from 'fp-ts/NonEmptyArray';
import { insertAt, lookup, member, updateAt } from 'fp-ts/Map';
import { eqString } from 'fp-ts/Eq';
import { chain as optionChain, map as optionMap, none, Option, some } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { findLast, dropLeftWhile, map } from 'fp-ts/Array';
import { Layered } from '../../utils/Layered/Layered';

export type BindingIdentifier = string;

export type ValueIdentifier = number;

export class Scope extends Layered {
  constructor(
    public bindings: Map<BindingIdentifier, ES1Value> = new Map,
    public isClosed: boolean = false
  ) {
    super();
  }
}

export class Context extends Layered { //@TODO: use better way to clone itself
  constructor(
    private scopes: NonEmptyArray<Scope> = [new Scope],
    private valueIdentifierGenerationBoundary: ValueIdentifier = 0,
  ) {
    super();
  }

  generateValueIdentifier(): [ValueIdentifier, Context] {
    const valueIdentifierGenerationBoundary = this.valueIdentifierGenerationBoundary;

    return [
      valueIdentifierGenerationBoundary,
      this.next(self => self.valueIdentifierGenerationBoundary = valueIdentifierGenerationBoundary + 1)
    ];
  }

  get scopeChain(): NonEmptyArray<Scope> {
    return pipe(
      this.scopes,
      dropLeftWhile(({ isClosed }) => !isClosed)
    ) as NonEmptyArray<Scope>;
  }

  getBindingStore(identifier: BindingIdentifier): Option<Scope['bindings']> {
    return pipe(
      this.scopes,
      map(({ bindings }) => bindings),
      findLast(member(eqString)(identifier))
    );
  }

  bind(value: ES1Value, identifier: BindingIdentifier): Context {
    return this.next(context => {
      context.scopes = snoc(
        init(this.scopes),
        head(this.scopes).next(scope => scope.bindings = insertAt(eqString)(identifier, value)(scope.bindings))
      );
    });
  }

  isolate(isClosed: boolean = false): Context {
    return new Context([...this.scopes, [new Map, isClosed]] as NonEmptyArray<Scope>, this.valueIdentifierGenerationBoundary);
  }

  terminate(): Option<Context> {
    return this.scopes.length > 1 ? some(new Context(init(this.scopes) as NonEmptyArray<Scope>, this.valueIdentifierGenerationBoundary)) : none;
  }

  ref(identifier: BindingIdentifier): Option<ES1Value> {
    return pipe(
      this.getBindingStore(identifier),
      optionChain(lookup(eqString)(identifier))
    )
  }

  set(identifier: BindingIdentifier, value: ES1Value): Option<Context> {
    return pipe(
      this.getBindingStore(identifier),
      optionChain(updateAt(eqString)(identifier, value)),
      optionMap(closestScope => new Context([...init(this.scopes), closestScope] as NonEmptyArray<Scope>, this.valueIdentifierGenerationBoundary))
    )
  }
}