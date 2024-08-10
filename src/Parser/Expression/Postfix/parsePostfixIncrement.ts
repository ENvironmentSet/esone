//@TODO: Add support for LineTerminator

import Parser from '../../Parser';
import { PostfixIncrement, postfixIncrement } from '../../AST';
import parseLeftHandSide from '../LeftHandSide';
import { tokenState } from '../../TokenState';
import { Increment } from '../../../Lexer';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { constant } from 'fp-ts/lib/function';

export const parsePostfixIncrement: Parser<PostfixIncrement> = tokenState.chain(
  parseLeftHandSide,
  leftHandSide => tokenState.map(
    matchTokenFromLeft(Increment),
    constant(postfixIncrement(leftHandSide))
  )
);

export default parsePostfixIncrement;
