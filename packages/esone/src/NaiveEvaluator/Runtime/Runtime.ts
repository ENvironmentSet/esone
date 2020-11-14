import { Option, none, some, getOrElse, map as optionMap, chain as optionChain } from 'fp-ts/lib/Option';
import { Either, right, map as eitherMap, flatten, left } from 'fp-ts/lib/Either';
import { ES1Value } from '../Type/ES1Value';
import { constant, flow, pipe } from 'fp-ts/function';
import { insertAt, lookup, member, updateAt } from 'fp-ts/Map';
import { eqString } from 'fp-ts/Eq';
import { NonEmptyArray, last, snoc, init } from 'fp-ts/NonEmptyArray';
import { findLast } from 'fp-ts/Array';

export type BindingIdentifier = string;

export type ValueIdentifier = number;

export class RuntimeError extends Error {} //@TODO Implement this

type Scope = Map<BindingIdentifier, ES1Value>;

export class Context {
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

export type Runtime = (context: Context) => Either<RuntimeError, [Option<ES1Value>, Context]>;

export function result(value: Option<ES1Value>, context: Context): ReturnType<Runtime> {
  return right([value, context]);
}

export const empty: Runtime = context => result(none, context);

export function extend(runtime: Runtime, extender: (value: Option<ES1Value>) => Runtime): Runtime {
  return flow(
    runtime,
    eitherMap(([value, context]) => extender(value)(context)),
    flatten
  )
}

export function intro(value: ES1Value): Runtime {
  return context => {
    const [valueIdentifier, resultContext] = context.generateValueIdentifier();

    return result(some(value.use(valueIdentifier)), resultContext);
  }
}

export function bind(value: ES1Value, identifier: BindingIdentifier): Runtime {
  return value.isIntroduced ? context => result(none, context.bind(value, identifier)) : abrupt(new RuntimeError('등록되지 않은 값임.'));
}

export function isolate(): Runtime {
  return context => result(none, context.isolate());
}

export function terminate(resultValue: Option<ES1Value>): Runtime {
  return context => pipe(
    context.terminate(),
    optionMap(context => result(resultValue, context)),
    getOrElse(() => abrupt(new RuntimeError('스코프는 최소 한 개 존재해야.'))(context))
  );
}

export function ref(identifier: BindingIdentifier): Runtime {
  return context => pipe(
    context.ref(identifier),
    optionMap(value => result(some(value), context)),
    getOrElse(() => abrupt(new RuntimeError('값 못 찾음.'))(context))
  );
}

export function set(identifier: BindingIdentifier, value: ES1Value): Runtime {
  return context => pipe(
    context.set(identifier, value),
    optionMap(context => result(none, context)),
    getOrElse(() => abrupt(new RuntimeError('값 못 넣음.'))(context))
  );
}

export function abrupt(runtimeError: RuntimeError): Runtime {
  return constant(left(runtimeError));
}
