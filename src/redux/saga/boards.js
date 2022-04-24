import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getBoardsSuccess } from '../actionCreators/boards';
import { GET_BOARDS_START } from '../actionTypes/boards';

const fetchBoards = ()=> axios.get('/api/boards'); 

function* boardsWorker(){
    console.log('YYY((');
    const {data} = yield call(fetchBoards);
    console.log(data);
    yield put(getBoardsSuccess(data));
}

export function* boardsWatcher(){
    yield takeEvery(GET_BOARDS_START,boardsWorker);
}