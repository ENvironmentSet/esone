import { Option, none, some, getOrElse, map as optionMap } from 'fp-ts/lib/Option';
import { Either, right, map as eitherMap, flatten, left } from 'fp-ts/lib/Either';
import { ES1Value } from '../Type/ES1Value';
import { constant, flow, pipe } from 'fp-ts/function';
import { Context, BindingIdentifier } from './Context';
import { fst } from 'fp-ts/Tuple';
import { RuntimeError } from './RuntimeError';

export type Runtime = (context: Context) => Either<RuntimeError, [Option<ES1Value>, Context]>;

export function run(program: Runtime, context: Context): Either<RuntimeError, Option<ES1Value>> {
  return eitherMap<[Option<ES1Value>, Context], Option<ES1Value>>(fst)<RuntimeError>(program(context));
}

export function result(value: Option<ES1Value>, context: Context): ReturnType<Runtime> {
  return right([value, context]);
}

export function intro(value: ES1Value): Runtime {
  return context => {
    const [valueIdentifier, resultContext] = context.generateValueIdentifier();

    return result(some(value.use(valueIdentifier)), resultContext);
  };
}

export function bind(value: ES1Value, identifier: BindingIdentifier): Runtime {
  return value.isIntroduced ? context => result(none, context.bind(value, identifier)) : abrupt('Unrecognizable value');
}

export function ref(identifier: BindingIdentifier): Runtime {
  return context => pipe(
    context.ref(identifier),
    optionMap(value => result(some(value), context)),
    getOrElse(() => abrupt('값 못 찾음.')(context))
  );
}

export function set(identifier: BindingIdentifier, value: ES1Value): Runtime {
  return context => pipe(
    context.set(identifier, value),
    optionMap(context => result(none, context)),
    getOrElse(() => abrupt('값 못 넣음.')(context))
  );
}

export function isolate(): Runtime {
  return context => result(none, context.isolate());
}

export function terminate(resultValue: Option<ES1Value>): Runtime {
  return context => pipe(
    context.terminate(),
    optionMap(context => result(resultValue, context)),
    getOrElse(() => abrupt('스코프는 최소 한 개 존재해야.')(context))
  );
}

export function extend(runtime: Runtime, extender: (value: Option<ES1Value>) => Runtime): Runtime {
  return flow(
    runtime,
    eitherMap(([value, context]) => extender(value)(context)),
    flatten
  );
}

export const empty: Runtime = context => result(none, context);

export function abrupt(errorMessage: string): Runtime {
  return constant(left(new RuntimeError(errorMessage)));
}

export const notImplemented = abrupt('NotImplemented');