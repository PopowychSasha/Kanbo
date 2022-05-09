import axios from 'axios';

export const changeStatus = (id,status)=>{
    axios.post('/api/task/status', {
            id: id,
            status: status,
        })
        .catch(err => console.log(err.message));
}