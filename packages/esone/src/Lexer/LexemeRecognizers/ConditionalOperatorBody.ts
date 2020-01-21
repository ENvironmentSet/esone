import { OrdinaryAutomata, stringToAutomata, anyAutomata, AnyAutomata } from '../Automata';
import Token from './Token';

export const ConditionalOperatorBodyRecognizer: OrdinaryAutomata = stringToAutomata(':');

export class ConditionalOperatorBody extends Token {}

export default [anyAutomata(ConditionalOperatorBodyRecognizer), ConditionalOperatorBody] as [AnyAutomata, typeof ConditionalOperatorBody];
