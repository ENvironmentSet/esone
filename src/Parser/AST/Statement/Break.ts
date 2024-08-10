export interface Break {
  readonly type: 'Break';
}

export function breakStatement(): Break {
  return { type: 'Break' };
}

export default Break;
