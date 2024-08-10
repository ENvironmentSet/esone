import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const VarRecognizer: OrdinaryAutomata = stringToAutomata('var');

export class Var extends ReservedWord {}

export const AutomataToVar: [OrdinaryAutomata, typeof Var] = [VarRecognizer, Var];