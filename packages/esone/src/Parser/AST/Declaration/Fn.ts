import { Identifier } from '../../../Lexer/LexemeRecognizers';
import { Block } from '../Statement';

export interface Fn {
  readonly type: 'Fn';
  readonly name: Identifier;
  readonly formalParameters: Identifier[];
  readonly body: Block;
}

export function fn(
  name: Identifier,
  formalParameters: Identifier[],
  body: Block
): Fn {
  return { type: 'Fn', name, formalParameters, body };
}

export default Fn;
