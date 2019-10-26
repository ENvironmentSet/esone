import { OrdinaryAutomata, stringToAutomata } from '../Automata';
import Token from './Token';

export const ConditionalOperatorHeadRecognizer: OrdinaryAutomata = stringToAutomata('?');

export class ConditionalOperatorHead extends Token {}

export default [ConditionalOperatorHeadRecognizer, ConditionalOperatorHead] as [OrdinaryAutomata, typeof ConditionalOperatorHead];
