import { pipe } from 'fp-ts/lib/pipeable';
import { map, flatten, array, last, scanLeft, filterMap, filter, cons, isEmpty } from 'fp-ts/lib/Array';
import { Option, map as fmap, option, chain, some } from 'fp-ts/lib/Option';
import { Automata, anyAutomata, AnyAutomata } from './Automata';
import { StringRecognizers, automataToTokenConstructor, Token } from './LexemeRecognizers';
import { Predicate } from 'fp-ts/lib/function';
import { tail, dropRightWhile } from '../utils';

export function tokenize(program: string): Option<Token[]> {
  function stringToTokens(string: string): Option<Token[]> {
    const chars: string[] = string.split('');
    const availableAutomatasPerChar: AnyAutomata[][] = pipe(
      chars,
      scanLeft(StringRecognizers, (prevAutomatas: AnyAutomata[], char: string) => pipe(
        prevAutomatas,
        filterMap(automata => automata(innerAutomata => fmap(anyAutomata)(Automata.transit(innerAutomata, char))))
      )),
      map(filter(innerAutomata => innerAutomata(Automata.isOnFinalState))),
      tail,
      dropRightWhile(isEmpty),
    );
    const usedString: string = string.slice(0, availableAutomatasPerChar.length);
    const unusedString: string = string.slice(availableAutomatasPerChar.length);

    return pipe(
      availableAutomatasPerChar,
      flatten,
      last,
      fmap(automataToTokenConstructor),
      fmap(Token => new Token(usedString)), //@TODO Need simplification(skipping passing lexeme, constructor as normal function)
      chain(token => {
        if (unusedString.length > 0 && unusedString) { //@TODO: cleanup here
          return pipe(
            unusedString,
            stringToTokens,
            fmap(tokens => cons(token, tokens))
          )
        } else {
          return some([token]);
        }
      })
    );
  }
  const space: RegExp = /[\u0020\u0009\u000B]/;

  return pipe(
    program.split(space),
    filter(<Predicate<string>>Boolean),
    map(stringToTokens),
    array.sequence(option),
    fmap(flatten),
  );
}