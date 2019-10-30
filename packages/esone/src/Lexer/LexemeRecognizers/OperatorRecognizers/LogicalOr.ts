import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LogicalOrRecognizer: OrdinaryAutomata = stringToAutomata('||');

export class LogicalOr extends Operator {}

export default [LogicalOrRecognizer, LogicalOr] as [OrdinaryAutomata, typeof LogicalOr];
