import { OrdinaryAutomata, stringToAutomata } from '../Automata';
import Token from './Token';

export const ConditionalOperatorBodyRecognizer: OrdinaryAutomata = stringToAutomata(':');

export class ConditionalOperatorBody extends Token {}

export default [ConditionalOperatorBodyRecognizer, ConditionalOperatorBody] as [OrdinaryAutomata, typeof ConditionalOperatorBody];
