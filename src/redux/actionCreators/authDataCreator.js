import { SET_AUTH_DATA } from '../actionTypes/authDataActionTypes';

export const authDataCreator = authData => {
	return {
		type: SET_AUTH_DATA,
		payload: authData,
	};
};
