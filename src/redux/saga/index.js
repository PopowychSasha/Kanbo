import { all } from 'redux-saga/effects';
import { accountWatcher } from './accountSaga';
import { boardsWatcher } from './boards';

export function* rootWatcher() {
	yield all([accountWatcher(),boardsWatcher()]);
}
