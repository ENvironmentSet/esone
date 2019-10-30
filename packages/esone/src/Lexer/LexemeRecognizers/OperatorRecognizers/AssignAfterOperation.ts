//@THINK: Do I really need this?
import {
  OrdinaryAutomata, FinalState, State, Transition,
  oneOf, equals, transitionPredicate
} from '../../Automata';
import { Operator } from '../Token';

const startS: State = new State('start');
const operationS: State = new State('operation');
const equalSignS: FinalState = new FinalState('equalSign');
const equalsSignP: transitionPredicate = equals('=');
const operationP: transitionPredicate = oneOf('*', '/', '%', '+', '-', '<<', '>>', '>>>', '&', '^', '|');
//@TODO: Refactor with DRY CODE

export const AssignAfterOperationRecognizer: OrdinaryAutomata = new OrdinaryAutomata(startS, [
  new Transition(operationP, startS, operationS),
  new Transition(equalsSignP, operationS, equalSignS)
]);

export class AssignAfterOperation extends Operator {}

export default [AssignAfterOperationRecognizer, AssignAfterOperation] as [OrdinaryAutomata, typeof AssignAfterOperation];
