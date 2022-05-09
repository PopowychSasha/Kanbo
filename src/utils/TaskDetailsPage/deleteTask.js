import axios from 'axios';

export const deleteTask = (taskId,navigate)=>{
    const goToPreviousPage = -1;
    axios
        .delete(`/api/task/${taskId}`)
        .then(() => {
            navigate(goToPreviousPage);
        })
        .catch(err => console.log(err.message));
}