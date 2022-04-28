import { all } from 'redux-saga/effects';
import { accountWatcher } from './account';
import { boardsWatcher } from './boards';

export function* rootWatcher() {
	yield all([accountWatcher(),boardsWatcher()]);
}
