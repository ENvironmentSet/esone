import { ES1Value } from '../Type/ES1Value';
import { init, last, NonEmptyArray, snoc } from 'fp-ts/NonEmptyArray';
import { insertAt, lookup, member, updateAt } from 'fp-ts/Map';
import { eqString } from 'fp-ts/Eq';
import { chain as optionChain, map as optionMap, none, Option, some } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { findLast } from 'fp-ts/Array';

export type BindingIdentifier = string;

export type ValueIdentifier = number;

type Scope = Map<BindingIdentifier, ES1Value>;

export class Context { //@TODO: use better way to clone itself
  constructor(
    private scopes: NonEmptyArray<Scope> = [new Map()],
    private valueIdentifierGenerationBoundary: ValueIdentifier = 0,
  ) {}

  generateValueIdentifier(): [ValueIdentifier, Context] {
    return [this.valueIdentifierGenerationBoundary, new Context(this.scopes, this.valueIdentifierGenerationBoundary + 1)];
  }

  bind(value: ES1Value, identifier: BindingIdentifier): Context {
    return new Context(
      snoc(init(this.scopes), insertAt(eqString)(identifier, value)(last(this.scopes))),
      this.valueIdentifierGenerationBoundary
    );
  }

  isolate(): Context {
    return new Context([...this.scopes, new Map] as NonEmptyArray<Scope>, this.valueIdentifierGenerationBoundary);
  }

  terminate(): Option<Context> {
    return this.scopes.length > 1 ? some(new Context(init(this.scopes) as NonEmptyArray<Scope>, this.valueIdentifierGenerationBoundary)) : none;
  }

  ref(identifier: BindingIdentifier): Option<ES1Value> {
    return pipe(
      this.scopes,
      findLast(member(eqString)(identifier)),
      optionChain(lookup(eqString)(identifier))
    )
  }

  set(identifier: BindingIdentifier, value: ES1Value): Option<Context> {
    return pipe(
      this.scopes,
      findLast(member(eqString)(identifier)),
      optionChain(updateAt(eqString)(identifier, value)),
      optionMap(closestScope => new Context([...init(this.scopes), closestScope] as NonEmptyArray<Scope>, this.valueIdentifierGenerationBoundary))
    )
  }
}