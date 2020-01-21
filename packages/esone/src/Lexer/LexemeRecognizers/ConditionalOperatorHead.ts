import { OrdinaryAutomata, stringToAutomata, anyAutomata, AnyAutomata } from '../Automata';
import Token from './Token';

export const ConditionalOperatorHeadRecognizer: OrdinaryAutomata = stringToAutomata('?');

export class ConditionalOperatorHead extends Token {}

export default [anyAutomata(ConditionalOperatorHeadRecognizer), ConditionalOperatorHead] as [AnyAutomata, typeof ConditionalOperatorHead];
