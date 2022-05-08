import axios from 'axios';

export const changeStatus = (id,status)=>{
    axios.post('/api/task/status', {
            id: id,
            status: status,
        })
        .then(res=>console.log(res))
        .catch(err => console.log(err.message));
}