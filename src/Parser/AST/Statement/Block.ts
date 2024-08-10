import Statement from './Statement';

export interface Block {
  readonly type: 'Block';
  readonly statements: Statement[];
}

export function block(statements: Statement[]): Block {
  return { type: 'Block', statements };
}

export default Block;
