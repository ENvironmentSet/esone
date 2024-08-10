import { match } from '../../Runtime/match';
import { compileIdentifierReference } from './compileIdentifierReference';
import { compileThis } from './compileThis';
import { compileLiteral } from './Literal/compileLiteral';
import { compileGrouping } from './compileGrouping';
import { Grouping } from '../../../Parser/AST/Expression/Primary';
import { ES1Value } from '../../Type/ES1Value';

export const compilePrimary = match(
  'IdentifierReference',
  compileIdentifierReference,
  match(
    'This',
    compileThis,
    match<Grouping, ES1Value>(
      'Grouping',
      compileGrouping,
      compileLiteral
    )
  )
);