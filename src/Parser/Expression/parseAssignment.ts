import { Assignment, assignment } from '../AST';
import Parser from '../Parser';
import parseConditional from './parseConditional';
import parseLeftHandSide from './LeftHandSide';
import composeTokenStates from '../composeTokenStates';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { AssignAfterOperation, EqualSign } from '../../Lexer';

export const parseAssignment1: Parser<Assignment> = composeTokenStates(
  tokenState.chain(
    parseLeftHandSide,
    leftHandSide => tokenState.chain(
      composeTokenStates(
        matchTokenFromLeft(AssignAfterOperation),
        matchTokenFromLeft(EqualSign)
      ),
      operation => tokenState.map(
        parseAssignment,
        rightHandSide => assignment(leftHandSide, operation, rightHandSide)
      )
    )
  ),
  parseConditional
);

import { Token } from '../../Lexer';
import { Option } from 'fp-ts/lib/Option';

export function parseAssignment(tokens: Token[]): Option<[Assignment, Token[]]> { //@FIXME: Circular dep
  return parseAssignment1(tokens);
}

export default parseAssignment;
