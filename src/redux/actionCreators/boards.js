import { GET_BOARDS_START, GET_BOARDS_SUCCESS } from "../actionTypes/boards"

export const getBoardsStart = ()=>{
    return {
        type:GET_BOARDS_START
    }
}

export const getBoardsSuccess = (data)=>{
    return {
        type:GET_BOARDS_SUCCESS,
        payload:data
    }
}

