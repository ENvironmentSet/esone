import { ES1Value } from '../Type/ES1Value';
import { BindingId, Context, ScopeId } from './Context';
import { Either, left, right, chain as eitherChain, map as eitherMap } from 'fp-ts/Either';
import { RuntimeError } from './RuntimeError';
import { Option, none, fold, some } from 'fp-ts/Option';
import { constant, flow, identity } from 'fp-ts/function';
import { fst, map as tupleMap } from 'fp-ts/Tuple';

type Cont<T> = <R>(cont: (result: T) => R) => R;

export type Runtime<T> = (context: Context) => Cont<Either<RuntimeError, [Option<T>, Context]>>;

function finish<T>(resultValue: Option<T>, resultContext: Context): ReturnType<Runtime<T>> {
  return f => f(right([resultValue, resultContext]));
}

export function empty<T>(): Runtime<T> {
  return context => finish(none, context);
}

export function error<T>(message: string): Runtime<T> {
  return constant(f => f(left(new RuntimeError(message))));
}

export function run<T>(context: Context, runtime: Runtime<T>): Either<RuntimeError, Option<T>> {
  return eitherMap<[Option<T>, Context], Option<T>>(fst)(runtime(context)(identity));
}

export function isolate<T>(baseScope: Option<ScopeId>, runtime: (escape: (result: Option<T>) => Runtime<T>, scopeId: ScopeId) => Runtime<T>): Runtime<T> {
  return context => cont => {
    const [currentScopeId, newContext, previousScope] = context.createScope(baseScope);

    return runtime(result => context2 => () => finish(result, context2.update({ currentlyReferencedScope: previousScope }))(cont), currentScopeId)(newContext)(cont);
  };
}

//@Refactor boilerplate code
export function bind<T>(value: ES1Value, name: BindingId): Runtime<T> {
  return context => cont => fold(constant(error<T>('Fail to bind value')(context)), empty<T>())(context.bind(value, name))(cont);
}

export function get(name: BindingId): Runtime<ES1Value> {
  return context => cont => fold(constant(error<ES1Value>('Fail to find binding')(context)), (value: ES1Value) => finish(some(value), context))(context.get(name))(cont);
}

export function set<T>(value: ES1Value, name: BindingId): Runtime<T> {
  return context => cont => fold(constant(error<T>('Fail to bind value')(context)), empty<T>())(context.set(value, name))(cont);
}

export function extend<A extends ES1Value, B>(runtime: Runtime<A>, extender: (value: Option<A>) => Runtime<B>): Runtime<B> {
  return context => cont => cont(runtime(context)(eitherChain(([value, context]) => extender(value)(context)(identity))));
}

export function lift<A extends ES1Value, B>(f: (value: Option<A>) => Option<B>): (runtime: Runtime<A>) => Runtime<B> {
  return runtime => flow(
    runtime,
    cont => cont2 => cont(flow(eitherMap(
      flow(
        tupleMap(f),
        ([value, context]) => [value, context] as [Option<B>, Context],
      )),
      cont2
    )),
  );
}