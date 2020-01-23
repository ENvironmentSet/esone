import { Token } from '../Lexer';
import { Option, fromPredicate, map, chain } from 'fp-ts/lib/Option';
import parseProgram from './parseProgram';
import AST from './AST';
import { pipe } from 'fp-ts/lib/pipeable';
import { fst } from 'fp-ts/lib/Tuple';
import { isMeaninglessToken } from './isMeaninglessToken';

export function parse(tokens: Token[]): Option<AST> {
  const parsed: Option<[AST, Token[]]> = parseProgram(tokens);

  return pipe(
    parsed,
    chain(fromPredicate(([_, tokens]) => tokens.every(isMeaninglessToken))),
    map(fst)
  );
}

export default parse;
