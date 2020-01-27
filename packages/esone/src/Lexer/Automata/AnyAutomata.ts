import { Automata } from './Automata';
import { Eq } from 'fp-ts/lib/Eq';
import { unsafeCoerce } from 'fp-ts/lib/function';

export type AnyAutomata = <R>(eliminator: <A extends Automata<A>>(automata: A) => R) => R

function anyAutomataConstructor<A extends Automata<A>>(automata: A): AnyAutomata {
  return eliminator => eliminator(automata);
}

function equals(x: AnyAutomata, y: AnyAutomata): boolean {
  return x(innerX =>
    y(innerY => {
      //@FIXME: even this coercion is safe, we need natural solution
      if (innerX instanceof innerY.constructor) return Automata.equals(innerY, unsafeCoerce(innerX));
      else if (innerY instanceof innerX.constructor) return Automata.equals(innerX, unsafeCoerce(innerY));
      else return false;
    })
  )
}

const anyAutomataInstanceDictionary: Eq<AnyAutomata> = {
  equals,
};

export const anyAutomata = Object.assign(anyAutomataConstructor, anyAutomataInstanceDictionary);