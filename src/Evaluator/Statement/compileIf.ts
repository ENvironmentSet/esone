import { If } from '../../Parser/AST/Statement/If';
import { isNone, Option } from 'fp-ts/Option';
import { ES1Value } from '../Type/ES1Value';
import { Runtime, extend, error, empty } from '../Runtime/Runtime';
import { compileExpression } from '../Expression/compileExpression';
import { ES1Boolean } from '../Type/ES1Boolean';
import { compileStatement } from './compileStatement';

export const compileIf: (ifStatement: If, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = (ifStatement, escape) => extend(
    compileExpression(ifStatement.condition),
    cond => isNone(cond)
      ? error('condition was not evaluated to value')
      : extend(
        cond.value.toBoolean(),
        cond => isNone(cond)
          ? error('condition was not evaluated to boolean')
          : ES1Value.equals(cond.value, ES1Boolean.ES1True())
            ? compileStatement(ifStatement.then, escape)
            : ifStatement.elseClause
              ? compileStatement(ifStatement.elseClause, escape)
              : empty()
      )
);