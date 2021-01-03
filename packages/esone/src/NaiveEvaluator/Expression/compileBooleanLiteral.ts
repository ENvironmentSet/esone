import { BoolLiteral } from '../../Parser/AST/Expression/Primary/Literal';
import { Runtime } from '../Runtime/Runtime';
import { ES1Boolean } from '../Type/ES1Boolean';
import { intro } from '../Runtime/intro';

export const compileBooleanLiteral: (literal: BoolLiteral) => Runtime<ES1Boolean>
  = literal => intro(literal.value.lexeme === 'true' ? ES1Boolean.ES1True() : ES1Boolean.ES1False());