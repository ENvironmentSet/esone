import { match } from '../../../Runtime/match';
import { compileBooleanLiteral } from './compileBooleanLiteral';
import { compileNullLiteral } from './compileNullLiteral';
import { compileNumericLiteral } from './compileNumericLiteral';
import { compileStringLiteral } from './compileStringLiteral';

export const compileLiteral = match(
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