export class Token {
  public readonly type: string = 'Token';

  constructor(public lexeme: string) {}
} //@TODO: Let distinguish token by as enum token type and token.type be list of token type.