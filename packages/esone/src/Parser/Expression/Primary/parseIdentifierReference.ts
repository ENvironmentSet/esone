import { IdentifierReference, identifierReference } from '../../AST';
import { Identifier } from '../../../Lexer';
import Parser from '../../Parser';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';

export const parseIdentifierReference: Parser<IdentifierReference> = tokenState.map(
  matchTokenFromLeft(Identifier),
  identifierReference
);

export default parseIdentifierReference;
