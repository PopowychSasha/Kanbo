import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getTaskDataSuccess } from '../actionCreators/task';
import { GET_TASK_DATA_START } from '../actionTypes/task';

const fetchTask =(taskId)=> axios.get(`/api/task/${taskId}`);

function* taskWorker(taskId){
    const {data} = yield call(()=>fetchTask(Number(taskId.payload)));
    yield put(getTaskDataSuccess(data[0]));
}

export function* taskWatcher(){
    yield takeEvery(GET_TASK_DATA_START,taskWorker);
}