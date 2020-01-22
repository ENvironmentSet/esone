import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LogicalNotRecognizer: OrdinaryAutomata = stringToAutomata('!');

export class LogicalNot extends Operator {}

export const AutomataToLogicalNot: [OrdinaryAutomata, typeof LogicalNot] = [LogicalNotRecognizer, LogicalNot];