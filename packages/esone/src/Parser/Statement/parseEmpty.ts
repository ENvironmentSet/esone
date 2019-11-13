import Parser from '../Parser';
import { Empty, empty } from '../AST';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { Semicolon } from '../../Lexer';

export const parseEmpty: Parser<Empty> = tokenState.map(
  matchTokenFromLeft(Semicolon),
  empty
);

export default parseEmpty;
