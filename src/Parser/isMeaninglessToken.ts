import { Token, Space, LineTerminator } from '../Lexer';

export function isMeaninglessToken(token: Token): boolean {
  return token instanceof Space || token instanceof LineTerminator;
}