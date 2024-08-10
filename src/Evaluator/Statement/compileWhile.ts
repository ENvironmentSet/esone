import While from '../../Parser/AST/Statement/While';
import { isNone, Option } from 'fp-ts/Option';
import { ES1Value } from '../Type/ES1Value';
import { Runtime, extend, error } from '../Runtime/Runtime';
import { compileExpression } from '../Expression/compileExpression';
import { compileStatement } from './compileStatement';

export const compileWhile: (whileStatement: While, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = (whileStatement, escape) => extend(
    compileExpression(whileStatement.condition),
    cond => isNone(cond)
      ? error('condition was not evaluated to value')
      : extend(
        cond.value.toBoolean(),
        cond => isNone(cond)
          ? error('condition was not evaluated to boolean')
          : extend(
            compileStatement(whileStatement.body, escape),
            () => compileWhile(whileStatement, escape)
          )
      )
);