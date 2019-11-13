import Parser from '../../Parser';
import { PrefixIncrement, prefixIncrement } from '../../AST';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { Increment } from '../../../Lexer';
import parseUnary from './index';

export const parsePrefixIncrement: Parser<PrefixIncrement> = tokenState.chain(
  matchTokenFromLeft(Increment),
  _ => tokenState.map(
    parseUnary,
    unaryExpression => prefixIncrement(unaryExpression)
  )
);

export default parsePrefixIncrement;
