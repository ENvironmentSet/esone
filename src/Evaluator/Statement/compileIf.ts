import { If } from '../../Parser/AST/Statement/If';
import { Option } from 'fp-ts/Option';
import { ES1Value } from '../Type/ES1Value';
import { Runtime, empty } from '../Runtime/Runtime';
import { compileExpression } from '../Expression/compileExpression';
import { ES1Boolean } from '../Type/ES1Boolean';
import { compileStatement } from './compileStatement';
import { extendWithValue } from '../Runtime/extendWithValue';

export const compileIf: (ifStatement: If, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = (ifStatement, escape) => extendWithValue(
    compileExpression(ifStatement.condition),
    cond => extendWithValue(
      cond.toBoolean(),
      cond => ES1Value.equals(cond, ES1Boolean.ES1True())
        ? compileStatement(ifStatement.then, escape)
        : ifStatement.elseClause
          ? compileStatement(ifStatement.elseClause, escape)
          : empty()
    )
);