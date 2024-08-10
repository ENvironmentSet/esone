//@TODO: Add support for LineTerminator

import Parser from '../../Parser';
import { PostfixDecrement, postfixDecrement } from '../../AST';
import parseLeftHandSide from '../LeftHandSide';
import { tokenState } from '../../TokenState';
import { Decrement } from '../../../Lexer';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { constant } from 'fp-ts/lib/function';

export const parsePostfixDecrement: Parser<PostfixDecrement> = tokenState.chain(
  parseLeftHandSide,
  leftHandSide => tokenState.map(
    matchTokenFromLeft(Decrement),
    constant(postfixDecrement(leftHandSide))
  )
);

export default parsePostfixDecrement;
