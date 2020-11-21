import { match } from '../../Runtime/match';
import { compileIdentifierReference } from './compileIdentifierReference';
import { compileThis } from './compileThis';
import { compileLiteral } from './Literal/compileLiteral';

export const compilePrimary = match(
    'IdentifierReference',
    compileIdentifierReference,
    match(
      'This',
      compileThis,
      compileLiteral
    )
  );