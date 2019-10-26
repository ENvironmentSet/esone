import AutomataToBoolean from './Boolean';
import AutomataToNull from './Null';
import AutomataToNumericLiteral from './NumericLiteral';
import AutomataToStringLiteral from './StringLiteral';

import { AnyAutomata } from '../../Automata';
import { Literal } from '../Token';

export * from './Boolean';
export * from './Null';
export * from './NumericLiteral';
export * from './StringLiteral';

export default [
  AutomataToBoolean,
  AutomataToNull,
  AutomataToNumericLiteral,
  AutomataToStringLiteral
] as [AnyAutomata, typeof Literal][];
