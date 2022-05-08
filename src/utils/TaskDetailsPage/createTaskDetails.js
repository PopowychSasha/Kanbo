import axios from 'axios';

export const createTaskDetails = (taskId,details,setDetails)=>{
    axios
        .post('/api/task/create/details', { taskId, details: details })
        .then(res => {
            setDetails(res.data);
        })
        .catch(err => {
            console.log(err.message);
        });
}