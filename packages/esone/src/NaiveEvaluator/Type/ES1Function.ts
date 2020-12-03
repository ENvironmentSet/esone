import { Identifier } from '../../Lexer/LexemeRecognizers';
import Block from '../../Parser/AST/Statement';
import { Scope } from '../Runtime/Context';
import { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import { ES1Object, ES1ObjectRepresentation } from './ES1Object';

interface ES1FunctionRepresentation extends ES1ObjectRepresentation {
  name: Identifier;
  formalParameters: Identifier[];
  body: Block;
  scopes: NonEmptyArray<Scope>;
}

export class ES1Function extends ES1Object {
  protected representation!: ES1FunctionRepresentation;

  static ES1Function(functionRepresentation: ES1FunctionRepresentation): ES1Function {
    return new ES1Function(functionRepresentation);
  }
}