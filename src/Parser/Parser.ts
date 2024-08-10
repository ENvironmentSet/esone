import { URI as optionURI } from 'fp-ts/lib/Option';
import AST from './AST';
import { StateM1 } from 'fp-ts/lib/StateT';
import { Monoid } from 'fp-ts/lib/Monoid';
import TokenState, { tokenState, getMonoid as getTokenStateMonoid } from './TokenState';

export type Parser<A extends AST> = TokenState<A>;

export const getMonoid: <A extends AST>() => Monoid<Parser<A>> = getTokenStateMonoid;

export const parser: StateM1<optionURI> = tokenState;

export default Parser;
