import { Fn } from '../../Parser/AST/Declaration';
import { bind, Runtime, extend, intro, abrupt, withValue } from '../Runtime/Runtime';
import { map, getOrElse } from 'fp-ts/Option';
import { ES1Function } from '../Type/ES1Function';
import { constant, flow } from 'fp-ts/function';
import { ES1PropertyRepresentation } from '../Type/ES1Object';
import { ES1String } from '../Type/ES1String';

export const compileFunction: (functionDeclaration: Fn) => Runtime
  = functionDeclaration => extend(
    context => extend(
      intro(ES1String.ES1String('name')),
      withValue<ES1String>(
        name => extend(
          intro(ES1String.ES1String(functionDeclaration.name.lexeme)),
          withValue(
            funcName => intro(ES1Function.ES1Function({
                properties: new Map([['name', new ES1PropertyRepresentation(name, funcName)]]), ...functionDeclaration, scopes: context.scopeChain }
              )
            )
          )
        ),
        value => value instanceof ES1String,
      )
    )(context),
    flow(
      map(fn => bind(fn, functionDeclaration.name.lexeme)),
      getOrElse(constant(abrupt('Fail to allocate function')))
    )
  );