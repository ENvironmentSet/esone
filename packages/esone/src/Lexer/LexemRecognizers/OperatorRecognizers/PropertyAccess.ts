import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const PropertyAccessRecognizer: OrdinaryAutomata = stringToAutomata('.');

export class PropertyAccess extends Operator {}

export default [PropertyAccessRecognizer, PropertyAccess] as [OrdinaryAutomata, typeof PropertyAccess];
