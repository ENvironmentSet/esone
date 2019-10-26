import { Option, chain, map as fmap, option, getOrElse } from 'fp-ts/lib/Option';
import { findFirstMap, reduce, map, getMonoid as getMonoidOfArray, array } from 'fp-ts/lib/Array';
import { constFalse } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { getMonoid as getMonoidOfMap, lookup, singleton } from 'fp-ts/lib/Map';
import { Monoid } from 'fp-ts/lib/Monoid';
import { foldM } from 'fp-ts/lib/Foldable';
import Automata from './Automata';
import State from './State';
import FinalState from './FinalState';
import Transition from './Transition';

//@TODO: Add compile time automata validation through type
//@TODO: Optimize with Lazy evaluation & DP
//@TODO: Add a function that converse an automata to an iterator

const { empty, concat }: Monoid<Map<State, Transition[]>>
  = getMonoidOfMap(State.state, getMonoidOfArray<Transition>());

export class OrdinaryAutomata extends Automata<OrdinaryAutomata> {
  public readonly stateMap: Map<State, Transition[]>;

  public constructor(public readonly currentState: State, public readonly transitions: Transition[]) {
    super();
    this.stateMap = pipe(
      transitions,
      map<Transition, [State, Transition]>(transition => [transition.from, transition]),
      reduce(empty,(stateMap, [state, transition]) => concat(stateMap, singleton(state, [transition])))
    );
  }

  public transit(automata: OrdinaryAutomata, char: string): Option<OrdinaryAutomata> {
    const { transitions, currentState: currentState, stateMap } : OrdinaryAutomata = automata;

    return pipe(
      lookup(State.state)(currentState, stateMap),
      chain(findFirstMap(transition => Transition.transit(transition, currentState, char))),
      fmap(nextState => new OrdinaryAutomata(nextState, transitions))
    );
  }

  public isOnFinalState({ currentState }: OrdinaryAutomata): boolean {
    return currentState instanceof FinalState;
  }

  public run(ordinaryAutomata: OrdinaryAutomata, string: string): boolean {
    return pipe(
      string.split(''),
      chars => foldM(option, array)(chars, ordinaryAutomata, Automata.transit),
      fmap(OrdinaryAutomata.isOnFinalState),
      getOrElse(constFalse)
    );
  }

  public equals(x: OrdinaryAutomata, y: OrdinaryAutomata): boolean {
    return x.transitions === y.transitions;
  }
}

export default OrdinaryAutomata;
