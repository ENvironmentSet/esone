import { BinaryBitwise } from '../../AST';
import Parser from '../../Parser';
import parseBitwiseOr from './parseBitwiseOr';

export const parseBinaryBitwise: Parser<BinaryBitwise> = parseBitwiseOr;

export default parseBinaryBitwise;
