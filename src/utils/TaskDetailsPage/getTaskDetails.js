import axios from 'axios';
import { toast } from 'react-toastify';

export const getTaskDetails = (taskId,setDetails,navigate) =>{
    const delayForCheckTaskAccess = 2000;
	const goToPreviousPage = -1;
    console.log('THIS ISSSS');
    axios
        .get(`/api/task/details/${taskId}`)
        .then(res => {
            
            console.log(res);
            setDetails(res.data.details);
        })
        .catch(err => {
            console.log('Still error!');
            console.log(err);
            toast.error('Access deny');
            setTimeout(() => {
                navigate(goToPreviousPage);
            }, delayForCheckTaskAccess);
            console.log(err.message);
        });
}