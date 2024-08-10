import { This, thisKeyword } from '../../AST';
import { This as ThisToken } from '../../../Lexer';
import Parser from '../../Parser';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';

export const parseThis: Parser<This> = tokenState.map(
  matchTokenFromLeft(ThisToken),
  thisKeyword
);

export default parseThis;
