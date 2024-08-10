import { CallOnly, MemberOnly } from '../../../Parser/AST/Expression/LeftHandSide';
import { Runtime, error } from '../../Runtime/Runtime';
import { ES1Value } from '../../Type/ES1Value';
import { match } from '../../Runtime/match';
import { compilePrimary } from '../Primary/compilePrimary';
import { extendWithValue } from '../../Runtime/extendWithValue';
import { intro } from '../../Runtime/intro';
import { ES1Reference } from '../../Type/ES1Reference';
import { ES1String } from '../../Type/ES1String';
import { constant } from 'fp-ts/function';
import { notImplemented } from '../../Runtime/notImplemented';
import { Identifier } from '../../../Lexer/LexemeRecognizers';
import { getValue } from '../../Runtime/getValue';

function compileBase(base: MemberOnly['base']): Runtime<ES1Value> {
  return match<CallOnly, ES1Value>('Call', constant(notImplemented<ES1String>()), compileMember)(base);
}

function compileReferencedName(referencedName: MemberOnly['referencedName']): Runtime<ES1String> {
  if (referencedName instanceof Identifier) return intro(ES1String.ES1String(referencedName.lexeme));
  //@TODO Support Bracket Notation(Exp as Key)
  else return error('NotImplemented');
}

export const compileMember = match<MemberOnly, ES1Value>(
  'Member',
  literal => extendWithValue(
    compileBase(literal.base),
    base => extendWithValue(
      getValue(base),
      base => extendWithValue(
        compileReferencedName(literal.referencedName),
        referencedName => intro(ES1Reference.ES1Reference({ base, referencedBinding: referencedName }))
      )
    )
  ),
  compilePrimary
);