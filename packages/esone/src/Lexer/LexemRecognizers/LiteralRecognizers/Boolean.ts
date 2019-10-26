import Automata, { OrdinaryAutomata, stringToAutomata, ExoticAutomata } from '../../Automata';
import { Literal } from '../Token';

const TrueRecognizer: OrdinaryAutomata = stringToAutomata('true');
const FalseRecognizer: OrdinaryAutomata = stringToAutomata('false');

const booleanRecognizers: OrdinaryAutomata[] = [
  TrueRecognizer,
  FalseRecognizer
];

export const BooleanRecognizer: ExoticAutomata = new ExoticAutomata(
  string => booleanRecognizers.some(recognizer => Automata.run(recognizer, string))
);

export class Boolean extends Literal {}

export default [BooleanRecognizer, Boolean] as [ExoticAutomata, typeof Boolean];
