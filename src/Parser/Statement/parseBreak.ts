import Parser from '../Parser';
import { Break, breakStatement } from '../AST/Statement';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { Break as BreakToken, Semicolon } from '../../Lexer';

export const parseBreak: Parser<Break> = tokenState.chain(
  matchTokenFromLeft(BreakToken),
  _ => tokenState.map(
    matchTokenFromLeft(Semicolon),
    breakStatement
  )
);

export default parseBreak;
