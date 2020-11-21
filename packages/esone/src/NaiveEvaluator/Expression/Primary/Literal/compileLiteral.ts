import Literal from '../../../../Parser/AST/Expression/Primary/Literal';
import { Runtime } from '../../../Runtime/Runtime';
import { match } from '../../../Runtime/match';
import { compileBooleanLiteral } from './compileBooleanLiteral';
import { compileNullLiteral } from './compileNullLiteral';
import { compileNumericLiteral } from './compileNumericLiteral';
import { compileStringLiteral } from './compileStringLiteral';

export const compileLiteral: (literal: Literal) => Runtime = match(
    'BoolLiteral',
    compileBooleanLiteral,
    match(
      'NullLiteral',
      compileNullLiteral,
      match(
        'NumericLiteral',
        compileNumericLiteral,
        match(
          'StringLiteral',
          compileStringLiteral
        )
      )
    )
  );