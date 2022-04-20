import { all } from 'redux-saga/effects';
import { accountWatcher } from './accountSaga';

export function* rootWatcher() {
	yield all([accountWatcher()]);
}
