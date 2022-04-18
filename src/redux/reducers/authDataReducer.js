import { SET_AUTH_DATA } from "../actionTypes/authDataActionTypes";

const setInitialState = ()=>{
    const token = document.cookie.split('=')[1];
    if(token){
        return ({isLogIn:true,token:token})
    }
    else{
        return ({isLogIn:false,token:''})
    }
}

const initialState = setInitialState();

export const authDataReducer = (state=initialState,action)=>{
    if(action.type===SET_AUTH_DATA){
        return ({
            isLogIn:action.payload.isLogIn,
            token:action.payload.token
        })
    }
    return state;
}