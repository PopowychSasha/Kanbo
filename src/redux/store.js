import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authDataReducer } from './reducers/authDataReducer';
import { accountDataReducer } from './reducers/accountDataReducer';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
	authDataReducer,
	accountDataReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootWatcher);
