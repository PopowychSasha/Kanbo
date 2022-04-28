import { SET_AUTH_DATA } from '../actionTypes/authData';

export const authDataCreator = authData => {
	return {
		type: SET_AUTH_DATA,
		payload: authData,
	};
};
