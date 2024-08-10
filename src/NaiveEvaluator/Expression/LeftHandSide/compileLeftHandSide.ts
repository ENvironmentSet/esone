import { match } from '../../Runtime/match';
import { compileCall } from './compileCall';
import { compilePrimary } from '../Primary/compilePrimary';

export const compileLeftHandSide = match(
  'Call',
  compileCall,
  compilePrimary,
);