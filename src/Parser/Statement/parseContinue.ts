import Parser from '../Parser';
import { Continue, continueStatement } from '../AST/Statement';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { Continue as ContinueToken, Semicolon } from '../../Lexer';

export const parseContinue: Parser<Continue> = tokenState.chain(
  matchTokenFromLeft(ContinueToken),
  _ => tokenState.map(
    matchTokenFromLeft(Semicolon),
    continueStatement
  )
);

export default parseContinue;
