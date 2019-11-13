import Expression from '../Expression';
import { Identifier } from '../../../../Lexer';
import Primary from '../Primary';
import Call from './Call';

export type Member = Primary |
  { readonly type: 'Member', readonly base: Member | Call, readonly referencedName: Expression | Identifier};

export function member(base: Member | Call, referencedName: Expression | Identifier): Member {
  return { type: 'Member', base, referencedName };
}

export default Member;
