import Call, { Member, MemberOnly } from '../../../Parser/AST/Expression/LeftHandSide';
import { Runtime, extend, notImplemented, abrupt, intro, result, withValue } from '../../Runtime/Runtime';
import { match } from '../../Runtime/match';
import { compilePrimary } from '../Primary/compillePrimary';
import { flow } from 'fp-ts/function';
import { chain, map, getOrElse } from 'fp-ts/Option';
import Expression from '../../../Parser/AST/Expression';
import { Identifier } from '../../../Lexer/LexemeRecognizers';
import { compileExpression } from '../compileExpression';
import { ES1String } from '../../Type/ES1String';
import { ES1PropertyRepresentation } from '../../Type/ES1Object';

const resolveReferenceName: (referenceName: Expression | Identifier) => Runtime
  = referenceName => referenceName instanceof Identifier ? intro(ES1String.ES1String(referenceName.lexeme)) : compileExpression(referenceName);

export const compileMember: (member: Member) => Runtime
  = match<MemberOnly>(
    'Member',
    member => extend(
      match<Call>(
        'Call',
        () => notImplemented,
        match(
          'Member',
          compileMember,
          compilePrimary
        ),
      )(member.base),
      flow(
        chain(base => base.wrap()),
        map(base => extend(
            resolveReferenceName(member.referencedName), //@TODO: Support Bracket notion
            withValue(
              referenceName => context => result(map((propertyReps: ES1PropertyRepresentation) => propertyReps.value)(base.get(referenceName)), context)
            )
          )
        ),
        getOrElse(() => abrupt('Non-coercible value'))
      )
    ),
    compilePrimary
  );