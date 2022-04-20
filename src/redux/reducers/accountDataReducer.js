import { REMOVE_SET_ACCOUNT_DATA, SET_ACCOUNT_DATA } from '../actionTypes/accountDataActionTypes';

const initialState = {};

export const accountDataReducer = (state = initialState, action) => {
	if (action.type === SET_ACCOUNT_DATA) {
		return action.payload;
	}
    else if(action.type === REMOVE_SET_ACCOUNT_DATA){
        return {}
    }
	return state;
};
