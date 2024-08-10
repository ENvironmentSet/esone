import { Unary } from '../../AST';
import Parser from '../../Parser';
import parsePostfix from '../Postfix';
import parseBitwiseNot from './parseBitwiseNot';
import parseDelete from './parseDelete';
import parseLogicalNot from './parseLogicalNot';
import parsePrefixDecrement from './parsePrefixDecrement';
import parsePrefixIncrement from './parsePrefixIncrement';
import parseTypeof from './parseTypeof';
import parseUnaryMinus from './parseUnaryMinus';
import parseUnaryPlus from './parseUnaryPlus';
import parseVoid from './parseVoid';
import composeTokenState from '../../composeTokenStates';

export const parseUnary: Parser<Unary> = composeTokenState<Unary>(
  parseBitwiseNot,
  parseDelete,
  parseLogicalNot,
  parsePrefixDecrement,
  parsePrefixIncrement,
  parseTypeof,
  parseUnaryMinus,
  parseUnaryPlus,
  parseVoid,
  parsePostfix
);

export default parseUnary;
