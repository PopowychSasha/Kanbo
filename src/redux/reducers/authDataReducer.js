import { SET_AUTH_DATA } from '../actionTypes/authDataActionTypes';

const setInitialState = () => {
	const token = document.cookie.split('=')[1];
	if (token) {
		return { isLogIn: true };
	} else {
		return { isLogIn: false };
	}
};

const initialState = setInitialState();

export const authDataReducer = (state = initialState, action) => {
	if (action.type === SET_AUTH_DATA) {
		return {
			isLogIn: action.payload.isLogIn,
		};
	}
	return state;
};
