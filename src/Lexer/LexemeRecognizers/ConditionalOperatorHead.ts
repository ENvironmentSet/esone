import { OrdinaryAutomata, stringToAutomata, anyAutomata, AnyAutomata } from '../Automata';
import { Token } from './Token';

export const ConditionalOperatorHeadRecognizer: OrdinaryAutomata = stringToAutomata('?');

export class ConditionalOperatorHead extends Token {}

export const AutomataToConditionalOperatorHead: [AnyAutomata, typeof ConditionalOperatorHead] =
  [anyAutomata(ConditionalOperatorHeadRecognizer), ConditionalOperatorHead];