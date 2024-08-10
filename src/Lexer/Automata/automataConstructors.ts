import { OrdinaryAutomata } from './OrdinaryAutomata';
import { State } from './State';
import { FinalState } from './FinalState';
import { Transition } from './Transition';
import { equals } from './transitionPredicateConstructors';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, zip, zipWith } from 'fp-ts/lib/Array';
import { tail, init } from '../../utils/Array';

export function stringToAutomata(string: string): OrdinaryAutomata {
  const chars: string[] = string.split('');
  const startS: State = new State('S');
  const finalS: FinalState = new FinalState('F');
  const states: State[] = pipe(
    chars,
    map(char => new State(char.toUpperCase())),
    states => [startS, ...init(states), finalS]
  );
  const transitions: Transition[] = pipe(
    zipWith(chars, zip(states, tail(states)), (char, [from, to]): [string, State, State] => [char, from, to]),
    map(([char, from, to]) => new Transition(equals(char), from, to))
  );

  return new OrdinaryAutomata(startS, transitions);
}