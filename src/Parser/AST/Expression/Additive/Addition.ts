import Additive from './index';

export interface Addition {
  readonly type: 'Addition';
  readonly left: Additive;
  readonly right: Additive;
}

export function addition(left: Additive, right: Additive): Addition {
  return { type: 'Addition', left, right };
}

export default Addition;
