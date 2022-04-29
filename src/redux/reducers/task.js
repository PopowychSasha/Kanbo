import { CHANGE_TASK_STATUS, GET_TASK_DATA_SUCCESS } from "../actionTypes/task";

const initialState = {};

export const taskReducer = (state=initialState,action)=>{
    if(action.type===GET_TASK_DATA_SUCCESS){
        return action.payload; 
    }
    else if(action.type===CHANGE_TASK_STATUS){
        return{
            ...state,status:action.payload
        }
    }
    return state; 
}