import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const AbstractEqualityRecognizer: OrdinaryAutomata = stringToAutomata('==');

export class AbstractEquality extends Operator {}

export default [AbstractEqualityRecognizer, AbstractEquality] as [OrdinaryAutomata, typeof AbstractEquality];
