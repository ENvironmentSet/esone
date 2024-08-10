import { Block } from '../../Parser/AST/Statement/Block';
import { Option } from 'fp-ts/Option';
import { empty, Runtime } from '../Runtime/Runtime';
import { ES1Value } from '../Type/ES1Value';
import { compose } from '../Runtime/compose';
import { compileStatement } from './compileStatement';

export const compileBlock: (block: Block, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = (block, escape) => block.statements.reduce((prev, statement) => compose(prev, compileStatement(statement, escape)), empty<ES1Value>());