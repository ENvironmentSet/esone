import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LogicalAndRecognizer: OrdinaryAutomata = stringToAutomata('&&');

export class LogicalAnd extends Operator {}

export default [LogicalAndRecognizer, LogicalAnd] as [OrdinaryAutomata, typeof LogicalAnd];
