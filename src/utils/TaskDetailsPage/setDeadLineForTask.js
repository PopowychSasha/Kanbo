import axios from "axios";
import moment from 'moment';

export const setDeadLineForTask = (taskId,deadline)=>{
    axios
        .post('/api/task/deadline', {
            taskId: taskId,
            deadline: moment(deadline).format('YYYY-MM-DD.HH:mm:ss'),
        })
        .catch(err => console.log(err));
}