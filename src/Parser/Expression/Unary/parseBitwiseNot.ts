import Parser from '../../Parser';
import { BitwiseNot, bitwiseNot } from '../../AST';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { BitwiseNot as BitwiseNotToken} from '../../../Lexer';
import parseUnary from './index';

export const parseBitwiseNot: Parser<BitwiseNot> = tokenState.chain(
  matchTokenFromLeft(BitwiseNotToken),
  _ => tokenState.map(
    parseUnary,
    unaryExpression => bitwiseNot(unaryExpression)
  )
);

export default parseBitwiseNot;
