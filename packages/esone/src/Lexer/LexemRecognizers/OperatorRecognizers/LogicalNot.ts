import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LogicalNotRecognizer: OrdinaryAutomata = stringToAutomata('!');

export class LogicalNot extends Operator {}

export default [LogicalNotRecognizer, LogicalNot] as [OrdinaryAutomata, typeof LogicalNot];
