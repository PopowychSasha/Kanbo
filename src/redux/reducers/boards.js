import { GET_BOARDS_SUCCESS} from '../actionTypes/boards';
const initialState = [];

export const boardsReducer = (state=initialState,action)=>{
    if(action.type===GET_BOARDS_SUCCESS){
        return [
            ...action.payload
        ];
    }
    return state;
}

