import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LogicalOrRecognizer: OrdinaryAutomata = stringToAutomata('||');

export class LogicalOr extends Operator {}

export const AutomataToLogicalOr: [OrdinaryAutomata, typeof LogicalOr] = [LogicalOrRecognizer, LogicalOr];