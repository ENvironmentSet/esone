import { pipe } from 'fp-ts/lib/pipeable';
import { last, scanLeft, filterMap, isEmpty, cons, map, filter, flatten } from 'fp-ts/lib/Array';
import { Option, map as fmap, some } from 'fp-ts/lib/Option';
import { Automata, anyAutomata, AnyAutomata } from './Automata';
import { StringRecognizers, automataToTokenConstructor, Token } from './LexemeRecognizers';
import { dropRightWhile, tail } from '../utils/Array';
import { stringToCharList } from '../utils/String';
import { flow, Predicate, constant } from 'fp-ts/lib/function';
import { chain as mergeBranchedPipe, func } from '../utils/Func';
import { getOptionM } from 'fp-ts/lib/OptionT';

const { chain: mergeBranchedOptionalPipe } = getOptionM(func);

const If: <A, R>(cond: Predicate<A>, onTrue: (a: A) => R, onFalse: () => R) => (a: A) => R =
  (cond, onTrue, onFalse) => a => cond(a) ? onTrue(a) : onFalse();

const scanLeftAndExcludeInitialState: typeof scanLeft = (init, reducer) => flow(
  scanLeft(init, reducer),
  tail
);

//@TODO refactor getNextToken
const getNextToken: (source: string) => Option<Token> = mergeBranchedOptionalPipe(
  flow(
    stringToCharList,
    scanLeftAndExcludeInitialState(StringRecognizers, (prevAutomatas: AnyAutomata[], char: string) => pipe(
      prevAutomatas,
      filterMap(automata => automata(innerAutomata => fmap(anyAutomata)(Automata.transit(innerAutomata, char)))),
    )),
    map(filter(innerAutomata => innerAutomata(Automata.isOnFinalState))),
    dropRightWhile(isEmpty),
    mergeBranchedPipe<AnyAutomata[][], number, Option<[typeof Token, number]>>(
      arr => arr.length,
      length => flow(
        flatten,
        last,
        fmap(automataToTokenConstructor),
        fmap(TokenConstructor => [TokenConstructor, length] as [typeof Token, number])
      )
    )
  ),
  ([TokenConstructor, length]) => source => some(new TokenConstructor(source.slice(0, length)))
);

const getUnmatchedString: (matchedString: string) => (source: string) => string =
    matchedString => source => source.slice(matchedString.length);

export const tokenize: (source: string) => Option<Token[]> = If(
  source => source.length > 0,
  mergeBranchedOptionalPipe(
    getNextToken,
    token => flow(
      getUnmatchedString(token.lexeme),
      tokenize,
      fmap(tokens => cons(token, tokens))
    )
  ),
  constant(some([] as Token[]))
);
