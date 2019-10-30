import { OrdinaryAutomata, stringToAutomata } from '../Automata';
import Token from './Token';

export const LineTerminatorRecognizer: OrdinaryAutomata = stringToAutomata('\n');

export class LineTerminator extends Token {}

export default [LineTerminatorRecognizer, LineTerminator] as [OrdinaryAutomata, typeof LineTerminator];
