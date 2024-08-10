import { match } from '../../../Runtime/match';
import { compileBooleanLiteral } from './compileBooleanLiteral';
import { compileNullLiteral } from './compileNullLiteral';
import { compileNumericLiteral } from './compileNumericLiteral';
import { compileStringLiteral } from './compileStringLiteral';
import { ES1Value } from '../../../Type/ES1Value';
import { StringLiteral } from '../../../../Parser/AST/Expression/Primary/Literal';

export const compileLiteral = match(
  'BoolLiteral',
  compileBooleanLiteral,
  match(
    'NullLiteral',
    compileNullLiteral,
    match(
      'NumericLiteral',
      compileNumericLiteral,
      match<StringLiteral, ES1Value>(
        'StringLiteral',
        compileStringLiteral
      )
    )
  )
);