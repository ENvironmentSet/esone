import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const PropertyAccessRecognizer: OrdinaryAutomata = stringToAutomata('.');

export class PropertyAccess extends Operator {}

export const AutomataToPropertyAccess: [OrdinaryAutomata, typeof PropertyAccess] =
  [PropertyAccessRecognizer, PropertyAccess];