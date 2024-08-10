import { NullLiteral, nullLiteral } from '../../../AST';
import { Null } from '../../../../Lexer';
import Parser from '../../../Parser';
import { tokenState } from '../../../TokenState';
import matchTokenFromLeft from '../../../matchTokenFromLeft';

export const parseNullLiteral: Parser<NullLiteral> = tokenState.map(
  matchTokenFromLeft(Null),
  nullLiteral
);

export default parseNullLiteral;
