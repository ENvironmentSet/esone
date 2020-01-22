import { Predicate } from 'fp-ts/lib/function';
import { State } from './State';
import { none, Option, some } from 'fp-ts/lib/Option';

export type transitionPredicate = Predicate<string>;

export class Transition {
  constructor(public predicate: transitionPredicate, public from: State, public to: State) {}

  static transit({ predicate, from, to }: Transition, current: State, string: string): Option<State> {
    return current === from && predicate(string) ? some(to) : none;
  }
}