import { AutomataToContinue } from './Continue';
import { AutomataToElse } from './Else';
import { AutomataToFn } from './Fn';
import { AutomataToFor } from './For';
import { AutomataToIn } from './In';
import { AutomataToReturn } from './Return';
import { AutomataToThis } from './This';
import { AutomataToWhile } from './While';
import { AutomataToWith } from './With';
import { AutomataToFutureReservedWord } from './FutureReservedWord';
import { AutomataToVar } from './Var';
import { AutomataToIf } from './If';
import { AutomataToBreak } from './Break';
import { AnyAutomata, anyAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export * from './Continue';
export * from './Else';
export * from './Fn';
export * from './For';
export * from './In';
export * from './Return';
export * from './This';
export * from './While';
export * from './With';
export * from './FutureReservedWord';
export * from './Var';
export * from './If';
export * from './Break';

export const AutomataToReservedWord: [AnyAutomata, typeof ReservedWord][] = [
  AutomataToContinue,
  AutomataToElse,
  AutomataToFn,
  AutomataToFor,
  AutomataToIn,
  AutomataToReturn,
  AutomataToThis,
  AutomataToWhile,
  AutomataToWith,
  AutomataToFutureReservedWord,
  AutomataToVar,
  AutomataToIf,
  AutomataToBreak
].map(([automata, token]) => [anyAutomata(automata), token]);
