import { LeftHandSide } from '../../AST';
import Parser from '../../Parser';
import composeTokenStates from '../../composeTokenStates';
import parseNew from './parseNew';
import parseCall from './parseCall';

export const parseLeftHandSide: Parser<LeftHandSide> = composeTokenStates<LeftHandSide>(
  parseCall, // order matter / 모호해짐, 왜지?
  parseNew,
);

export default parseLeftHandSide;
