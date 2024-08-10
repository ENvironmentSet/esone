import { If } from '../../Parser/AST/Statement/If'
import { isNone, Option } from 'fp-ts/Option'
import { ES1Value } from '../Type/ES1Value'
import { Runtime, extend, error, empty } from '../Runtime/Runtime'
import { compileExpression } from '../Expression/compileExpression'
import { ES1Boolean } from '../Type/ES1Boolean'
import { compileStatement } from './compileStatement'

export const compileIf: (ifStatement: If, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = (ifStatement, escape) => extend(
    compileExpression(ifStatement.condition),
    cond => {
      if (isNone(cond)) return error('condition was not evaluated to value')
      else {
        const condValue = cond.value

        return extend(
          condValue.toBoolean(),
          condBool => {
            if (isNone(condBool)) return error('condition was not evaluated to boolean')
            if (ES1Value.equals(condBool.value, ES1Boolean.ES1True())) return compileStatement(ifStatement.then, escape)
            else if (ifStatement.elseClause)return compileStatement(ifStatement.elseClause, escape)
            else return empty();
          }
        )
      }
    }
)