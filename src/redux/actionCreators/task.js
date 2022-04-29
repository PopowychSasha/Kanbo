import { CHANGE_TASK_STATUS, GET_TASK_DATA_START, GET_TASK_DATA_SUCCESS } from "../actionTypes/task"

export const getTaskDataStart = (taskId)=>{
    return{
        type:GET_TASK_DATA_START,
        payload:taskId
    }
}

export const getTaskDataSuccess = (data)=>{
    return{
        type:GET_TASK_DATA_SUCCESS,
        payload:data
    }
}

export const changeTaskStatus = (status)=>{
    return{
        type:CHANGE_TASK_STATUS,
        payload:status
    }
}