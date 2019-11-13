import Parser from '../../Parser';
import { PrefixDecrement, prefixDecrement } from '../../AST';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { Decrement } from '../../../Lexer';
import parseUnary from './index';

export const parsePrefixDecrement: Parser<PrefixDecrement> = tokenState.chain(
  matchTokenFromLeft(Decrement),
  _ => tokenState.map(
    parseUnary,
    unaryExpression => prefixDecrement(unaryExpression)
  )
);

export default parsePrefixDecrement;
