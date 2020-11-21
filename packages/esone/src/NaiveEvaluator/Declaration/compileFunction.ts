import { Fn } from '../../Parser/AST/Declaration';
import { bind, Runtime, extend, intro, abrupt } from '../Runtime/Runtime';
import { map, getOrElse } from 'fp-ts/Option';
import { ES1Function } from '../Type/ES1Function';
import { constant, flow } from 'fp-ts/function';

export const compileFunction: (functionDeclaration: Fn) => Runtime
  = functionDeclaration => extend(
    context => intro(ES1Function.ES1Function({...functionDeclaration, scopes: context.scopeChain }))(context),
    flow( //@TODO: distinguish Optional and non-optional value Runtime.
      map(fn => bind(fn, functionDeclaration.name.lexeme)),
      getOrElse(constant(abrupt('Fail to allocate function')))
    )
  );