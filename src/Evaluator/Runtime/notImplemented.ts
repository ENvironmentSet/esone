import { error, Runtime } from './Runtime';

export const notImplemented: <T>() => Runtime<T> = <T>() => error<T>('notImplemented');