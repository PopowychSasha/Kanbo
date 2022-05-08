import axios from 'axios';

export const deleteTask = (taskId,navigate)=>{
    axios
        .delete(`/api/task/${taskId}`)
        .then(() => {
            navigate(-1);
        })
        .catch(err => console.log(err.message));
}