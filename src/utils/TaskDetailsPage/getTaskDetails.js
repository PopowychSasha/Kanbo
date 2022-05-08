import axios from 'axios';
import { toast } from 'react-toastify';

export const getTaskDetails = (taskId,setDetails,navigate) =>{
    axios
        .get(`/api/task/details/${taskId}`)
        .then(res => {
            setDetails(res.data.details);
        })
        .catch(err => {
            toast.error('Access deny');
            setTimeout(() => {
                navigate(-1);
            }, 2000);
            console.log(err.message);
        });
}