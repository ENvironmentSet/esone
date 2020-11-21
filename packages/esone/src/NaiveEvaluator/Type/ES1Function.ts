import { ES1Value } from './ES1Value';
import { Identifier } from '../../Lexer/LexemeRecognizers';
import Block from '../../Parser/AST/Statement';
import { Scope } from '../Runtime/Context';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';

interface ES1FunctionRepresentation {
  name: Identifier;
  formalParameters: Identifier[];
  body: Block;
  scopes: NonEmptyArray<Scope>;
}

export class ES1Function extends ES1Value {
  protected representation!: ES1FunctionRepresentation;

  static ES1Function(functionRepresentation: ES1FunctionRepresentation): ES1Function {
    return new ES1Function(functionRepresentation);
  }
}