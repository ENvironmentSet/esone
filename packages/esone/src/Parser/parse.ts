import { Token, LineTerminator } from '../Lexer';
import { Option, fromPredicate, map, chain } from 'fp-ts/lib/Option';
import parseProgram from './parseProgram';
import AST from './AST';
import { pipe } from 'fp-ts/lib/pipeable';
import { fst } from 'fp-ts/lib/Tuple';

export function parse(tokens: Token[]): Option<AST> {
  const parsed: Option<[AST, Token[]]> = parseProgram(tokens);

  return pipe(
    parsed,
    chain(fromPredicate(([_, tokens]) => tokens.every(token => token instanceof LineTerminator))),
    map(fst)
  );
}

export default parse;
