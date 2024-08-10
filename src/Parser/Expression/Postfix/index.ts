import Parser from '../../Parser';
import { Postfix } from '../../AST';
import composeTokenStates from '../../composeTokenStates';
import parseLeftHandSide from '../LeftHandSide';
import parsePostfixDecrement from './parsePostfixDecrement';
import parsePostfixIncrement from './parsePostfixIncrement';

export const parsePostfix: Parser<Postfix> = composeTokenStates<Postfix>(
  parsePostfixDecrement,
  parsePostfixIncrement,
  parseLeftHandSide
);

export default parsePostfix;
