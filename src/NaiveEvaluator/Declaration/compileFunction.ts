import AST from '../../Parser/AST';
import { Runtime, bind } from '../Runtime/Runtime';
import { ES1Value } from '../Type/ES1Value';
import { match } from '../Runtime/match';
import { Fn } from '../../Parser/AST/Declaration/Fn';
import { ES1Function, ES1FunctionRepresentation } from '../Type/ES1Function';
import { extendWithValue } from '../Runtime/extendWithValue';

export const compileFunction: (ast: AST) => Runtime<ES1Value> = match<Fn, ES1Value>(
  'Fn',
  ({ name, formalParameters, body }) => context => extendWithValue(
    ES1Function.ES1Function(new ES1FunctionRepresentation(
      name.lexeme,
      formalParameters.map(formalParameter => formalParameter.lexeme),
      body,
      context.currentScope
    )),
    fn => bind<ES1Value>(
      fn,
      name.lexeme
    )
  )(context)
);