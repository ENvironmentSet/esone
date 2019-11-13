import { Grouping, grouping } from '../../AST';
import { LeftParenthesis, RightParenthesis } from '../../../Lexer';
import Parser from '../../Parser';
import { tokenState } from '../../TokenState';
import parseExpression from '../parseExpression'
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { constant } from 'fp-ts/lib/function';

export const parseGrouping: Parser<Grouping> = tokenState.chain(
  matchTokenFromLeft(LeftParenthesis),
  _ => tokenState.chain(
    parseExpression,
    expression => tokenState.map(
      matchTokenFromLeft(RightParenthesis),
      constant(grouping(expression))
    )
  )
);

export default parseGrouping;
