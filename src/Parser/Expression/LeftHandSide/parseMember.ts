import { Member, member, Expression } from '../../AST';
import { Identifier, LeftBracket, RightBracket, PropertyAccess } from '../../../Lexer';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import parsePrimary from '../Primary';
import parseExpression from '../parseExpression';
import composeTokenStates from '../../composeTokenStates';
import { reduce, cons } from 'fp-ts/lib/Array';

type PropertyName = Expression | Identifier;

const parsePropertyAccess: TokenState<PropertyName[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(LeftBracket),
    _ => tokenState.chain(
      parseExpression,
      expression => tokenState.chain(
        matchTokenFromLeft(RightBracket),
        _ => composeTokenStates(
          tokenState.map(
            parsePropertyAccess,
            propertyNames => cons(expression, propertyNames)
          ),
          tokenState.of([expression])
        )
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(PropertyAccess),
    _ => tokenState.chain(
      matchTokenFromLeft(Identifier),
      identifier => composeTokenStates(
        tokenState.map(
          parsePropertyAccess,
          propertyNames => cons(identifier, propertyNames)
        ),
        tokenState.of([identifier])
      )
    )
  ),
  tokenState.of([] as PropertyName[])
);

export const parseMember: Parser<Member> = tokenState.chain(
  parsePrimary,
  deepestBase => composeTokenStates(
    tokenState.map(
      parsePropertyAccess,
      reduce<PropertyName, Member>(deepestBase, (base, propertyName) => member(base, propertyName))
    ),
    tokenState.of(deepestBase)
  )
);

export default parseMember;
