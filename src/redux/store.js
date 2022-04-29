import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authDataReducer } from './reducers/authData';
import { accountDataReducer } from './reducers/accountData';
import { boardsReducer } from './reducers/boards';
import { taskReducer } from './reducers/task';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
	authDataReducer,
	accountDataReducer,
	boardsReducer,
	taskReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootWatcher);
