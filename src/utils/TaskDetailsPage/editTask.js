import axios from 'axios';

export const editTaskHandler = (editTask,taskId)=>{
    axios
        .post('/api/task/edit', { taskId: taskId, editTask: editTask })
        .then(res => console.log(res))
        .catch(err => console.log(err.message));
}