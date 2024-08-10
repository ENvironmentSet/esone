import { AutomataToBool } from './Bool';
import { AutomataToNull } from './Null';
import { AutomataToNumericLiteral } from './NumericLiteral';
import { AutomataToStringLiteral } from './StringLiteral';

import { anyAutomata, AnyAutomata } from '../../Automata';
import { Literal } from '../Token';

export * from './Bool';
export * from './Null';
export * from './NumericLiteral';
export * from './StringLiteral';

export const AutomataToLiteral = [
  AutomataToBool,
  AutomataToNull,
  AutomataToNumericLiteral,
  AutomataToStringLiteral
].map(([automata, token]) => [anyAutomata(automata), token] as [AnyAutomata, typeof Literal]);