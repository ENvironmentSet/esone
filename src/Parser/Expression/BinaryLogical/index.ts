import { BinaryLogical } from '../../AST';
import Parser from '../../Parser';
import parseLogicalOr from './parseLogicalOr';

export const parseBinaryLogical: Parser<BinaryLogical> = parseLogicalOr;

export default parseBinaryLogical;
