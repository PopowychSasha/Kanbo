import {
	ASYNC_SET_ACCOUNT_DATA,
	REMOVE_SET_ACCOUNT_DATA,
	SET_ACCOUNT_DATA,
} from '../actionTypes/accountDataActionTypes';

export const accountDataCreator = data => {
	return {
		type: SET_ACCOUNT_DATA,
		payload: data,
	};
};

export const asyncAccountDataCreator = () => {
	return {
		type: ASYNC_SET_ACCOUNT_DATA,
	};
};

export const removeAccountDataCreator = () => {
	return {
		type: REMOVE_SET_ACCOUNT_DATA
	};
};
