import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { accountDataCreator } from '../actionCreators/accountData';
import { ASYNC_SET_ACCOUNT_DATA } from '../actionTypes/accountData';
const fetchAccountData = () => axios.get('/api/account');

function* accountWorker() {

	const { data } = yield call(fetchAccountData);
	yield put(accountDataCreator(data));
    /* GET_ACCOUNT_DATA_ERROR
    GET_ACCOUNT_DATA_SUCCESS
    і action так само називати */
}

export function* accountWatcher() {
	yield takeEvery(ASYNC_SET_ACCOUNT_DATA /* GET_ACCOUNT_DATA_START */, accountWorker);
}
