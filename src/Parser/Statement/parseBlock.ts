import Parser from '../Parser';
import { Block, Statement, block } from '../AST';
import parseStatement from './parseStatement';
import composeTokenStates from '../composeTokenStates';
import matchTokenFromLeft from '../matchTokenFromLeft';
import TokenState, { tokenState } from '../TokenState';
import { LeftBrace, RightBrace } from '../../Lexer';
import { cons } from 'fp-ts/lib/Array';

const parseStatements: TokenState<Statement[]> = tokens => composeTokenStates(
  tokenState.chain(
    parseStatement,
    statement => tokenState.map(
      parseStatements,
      statements => cons(statement, statements)
    ),
  ),
  tokenState.of([] as Statement[])
)(tokens); //@FIXME Circular dep

export const parseBlock: Parser<Block> = tokenState.chain(
  matchTokenFromLeft(LeftBrace),
  _ => tokenState.chain(
    tokens => parseStatements(tokens),
    statements => tokenState.map(
      matchTokenFromLeft(RightBrace),
      _ => block(statements)
    )
  )
);

export default parseBlock;
