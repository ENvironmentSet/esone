import { New, newOperator } from '../../AST';
import Parser from '../../Parser';
import { New as NewToken } from '../../../Lexer';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import composeTokenStates from '../../composeTokenStates';
import parseMember from './parseMember';
import parseArguments from './parseArguments';

export const parseNew: Parser<New> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(NewToken),
    _ => tokenState.chain(
      parseNew,
      newtarget => composeTokenStates(
        tokenState.map(
          parseArguments,
          argumentList => newOperator(newtarget, argumentList)
        ),
        tokenState.of(newOperator(newtarget))
      )
    )
  ),
  parseMember
);

export default parseNew;
