import While from '../../Parser/AST/Statement/While';
import { Option } from 'fp-ts/Option';
import { ES1Value } from '../Type/ES1Value';
import { Runtime, empty } from '../Runtime/Runtime';
import { compileExpression } from '../Expression/compileExpression';
import { compileStatement } from './compileStatement';
import { extendWithValue } from '../Runtime/extendWithValue';
import { ES1Boolean } from '../Type/ES1Boolean';
import { compose } from '../Runtime/compose';

export const compileWhile: (whileStatement: While, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = (whileStatement, escape) => extendWithValue(
    compileExpression(whileStatement.condition),
    cond => extendWithValue(
      cond.toBoolean(),
      cond => ES1Value.equals(cond, ES1Boolean.ES1True())
        ? compose(
            compileStatement(whileStatement.body, escape),
            compileWhile(whileStatement, escape)
          )
        : empty()
    )
);