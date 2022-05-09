import axios from 'axios';
import { toast } from 'react-toastify';

export const getTaskDetails = (taskId,setDetails,navigate) =>{
    const delayForCheckTaskAccess = 2000;
	const goToPreviousPage = -1;
    
    axios
        .get(`/api/task/details/${taskId}`)
        .then(res => {
            setDetails(res.data.details);
        })
        .catch(err => {
            toast.error('Access deny');
            setTimeout(() => {
                navigate(goToPreviousPage);
            }, delayForCheckTaskAccess);
            console.log(err.message);
        });
}