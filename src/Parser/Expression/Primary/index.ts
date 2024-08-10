import Parser from '../../Parser';
import { Primary } from '../../AST';
import composeTokenStates from '../../composeTokenStates';
import parseLiteral from './Literal';
import parseGrouping from './parseGrouping';
import parseIdentifierReference from './parseIdentifierReference';
import parseThis from './parseThis';

export const parsePrimary: Parser<Primary> = composeTokenStates<Primary>(
  parseLiteral,
  parseGrouping,
  parseIdentifierReference,
  parseThis
);

export default parsePrimary;
