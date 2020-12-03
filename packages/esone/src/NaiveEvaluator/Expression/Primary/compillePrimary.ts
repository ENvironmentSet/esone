import { match } from '../../Runtime/match';
import { compileIdentifierReference } from './compileIdentifierReference';
import { compileThis } from './compileThis';
import { compileLiteral } from './Literal/compileLiteral';
import { compileGrouping } from './compileGrouping';

export const compilePrimary = match(
    'IdentifierReference',
    compileIdentifierReference,
    match(
      'This',
      compileThis,
      match(
        'Grouping',
        compileGrouping,
        compileLiteral
      )
    )
  );