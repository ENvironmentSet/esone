import Parser from './Parser';
import AST from './AST';
import { Operator } from '../Lexer';
import parseEquality from './Expression/Equality';
import {tokenState} from './TokenState';

declare function buildBinaryOperatorParser<A extends AST, B extends AST, O extends typeof Operator>(
  operandParser: Parser<B>, operatorTokenConstructor: O, astBuilder: (left: B, right: B) => A
): Parser<A>

declare function buildUnaryOperatorParser<A extends AST, B extends AST, O extends typeof Operator>(
  operandParser: Parser<B>, operatorTokenConstructor: O, astBuilder: (operand: B) => A
): Parser<A>
