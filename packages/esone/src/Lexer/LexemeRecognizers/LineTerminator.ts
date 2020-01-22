import { OrdinaryAutomata, stringToAutomata, anyAutomata, AnyAutomata } from '../Automata';
import { Token } from './Token';

export const LineTerminatorRecognizer: OrdinaryAutomata = stringToAutomata('\n');

export class LineTerminator extends Token {}

export const AutomataToLineTerminator: [AnyAutomata, typeof LineTerminator] =
  [anyAutomata(LineTerminatorRecognizer), LineTerminator];