import { pipe } from 'fp-ts/lib/pipeable';
import { map, flatten, last, scanLeft, filterMap, filter, isEmpty, getMonoid } from 'fp-ts/lib/Array';
import { Option, map as fmap, chain, getMonoid as getMonoidOfOption, some } from 'fp-ts/lib/Option';
import { Automata, anyAutomata, AnyAutomata } from './Automata';
import { StringRecognizers, automataToTokenConstructor, Token } from './LexemeRecognizers';
import { dropRightWhile } from '../utils/Array';
import { stringToChars } from '../utils/String';
import { flow } from 'fp-ts/lib/function';
import { chain as bind, of } from '../utils/Func';

const { concat } = getMonoidOfOption(getMonoid<Token>());

export const tokenize: (source: string) => Option<Token[]> = flow(
  stringToChars,
  source => pipe(
    source,
    scanLeft(StringRecognizers, (prevAutomatas: AnyAutomata[], char: string) => pipe(
      prevAutomatas,
      filterMap(automata => automata(innerAutomata => fmap(anyAutomata)(Automata.transit(innerAutomata, char))))
    )),
    map(filter(innerAutomata => innerAutomata(Automata.isOnFinalState))),
    dropRightWhile(isEmpty),
    bind(
      flow(
        flatten,
        last,
      ),
      longestMatch => bind(
        automataMatrix => [source.join('').slice(0, automataMatrix.length - 1), source.join('').slice(automataMatrix.length - 1)],
        ([usedString, unusedString]) => of(
          chain(flow(
            automataToTokenConstructor,
            Token => new Token(usedString),
            token => concat(some([token]), tokenize(unusedString))
          ))(longestMatch),
        )
      )
    )
  )
);