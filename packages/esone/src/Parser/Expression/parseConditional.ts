import { Conditional, conditional } from '../AST';
import Parser from '../Parser';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import parseBinaryLogical from './BinaryLogical';
import parseAssignment from './parseAssignment';
import composeTokenStates from '../composeTokenStates';
import { ConditionalOperatorHead, ConditionalOperatorBody } from '../../Lexer';

export const parseConditional: Parser<Conditional> = tokenState.chain(
  parseBinaryLogical,
  condition => composeTokenStates(
    tokenState.chain(
      matchTokenFromLeft(ConditionalOperatorHead),
      _ => tokenState.chain(
        parseAssignment,
        trueBranch => tokenState.chain(
          matchTokenFromLeft(ConditionalOperatorBody),
          _ => tokenState.map(
            parseAssignment,
            falseBranch => conditional(condition, trueBranch, falseBranch)
          )
        )
      )
    ),
    tokenState.of(condition)
  )
);

export default parseConditional;
