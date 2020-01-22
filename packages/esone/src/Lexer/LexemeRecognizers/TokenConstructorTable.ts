import { Token } from './Token';
import { AnyAutomata, anyAutomata } from '../Automata';
import { lookup } from 'fp-ts/lib/Map';
import { Some } from 'fp-ts/lib/Option';
import { AutomataToLineTerminator } from './LineTerminator';
import { AutomataToIdentifier } from './Identifier';
import { AutomataToSemicolon } from './Semicolon';
import { AutomataToConditionalOperatorHead } from './ConditionalOperatorHead';
import { AutomataToConditionalOperatorBody } from './ConditionalOperatorBody';
import { AutomataToReservedWord } from './ReservedWordRecognizers';
import { AutomataToOperator } from './OperatorRecognizers';
import { AutomataToLiteral } from './LiteralRecognizers';

type TokenConstructorTable = Map<AnyAutomata, typeof Token>;

const TokenConstructorTable: TokenConstructorTable = new Map([
  AutomataToLineTerminator, //@TODO: Better naming?
  AutomataToIdentifier,
  AutomataToSemicolon,
  AutomataToConditionalOperatorHead,
  AutomataToConditionalOperatorBody,
  ...AutomataToReservedWord,
  ...AutomataToOperator,
  ...AutomataToLiteral
]);

export function automataToTokenConstructor(automata: AnyAutomata): typeof Token {
  return (lookup(anyAutomata)(automata, TokenConstructorTable) as Some<typeof Token>).value;
  //@FIXME: should be cleaned with proper typing
  //@TODO: Replace Map with safer data structure
}