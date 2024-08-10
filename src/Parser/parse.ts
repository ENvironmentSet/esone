import { Token } from '../Lexer';
import { Option, fromPredicate, map, chain } from 'fp-ts/lib/Option';
import parseProgram from './parseProgram';
import { Program } from './AST';
import { pipe } from 'fp-ts/lib/pipeable';
import { fst } from 'fp-ts/lib/Tuple';
import { isMeaninglessToken } from './isMeaninglessToken';

export function parse(tokens: Token[]): Option<Program> {
  const parsed: Option<[Program, Token[]]> = parseProgram(tokens);

  return pipe(
    parsed,
    chain(fromPredicate(([_, tokens]) => tokens.every(isMeaninglessToken))),
    map(fst)
  );
}

export default parse;
