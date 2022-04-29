import { all } from 'redux-saga/effects';
import { accountWatcher } from './account';
import { boardsWatcher } from './boards';
import { taskWatcher } from './task';

export function* rootWatcher() {
	yield all([accountWatcher(),boardsWatcher(),taskWatcher()]);
}
