import Arguments from './Arguments';
import Member from './Member';

export type CallOnly = { readonly type: 'Call', readonly callee: Call, readonly argumentList: Arguments };
export type Call = Member | CallOnly;

export function call(callee: Call, argumentList: Arguments): Call {
  return { type: 'Call', callee, argumentList };
}

export default Call;
