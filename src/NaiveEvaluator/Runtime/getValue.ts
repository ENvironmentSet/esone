import { ES1Reference } from '../Type/ES1Reference';
import { ES1Value } from '../Type/ES1Value';
import { Runtime } from './Runtime';
import { intro } from './intro';

export const getValue: (ref: ES1Value) => Runtime<ES1Value>
  = ref => ref instanceof ES1Reference ? ref.getValue() : intro(ref);