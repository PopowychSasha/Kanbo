import axios from 'axios';

export const createBoard = (boardName,navigate)=>{
    axios
        .post('/api/board', { name: boardName })
        .then(res => {
            navigate(`/board/${res.data.id}`);
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 401) {
                    navigate('/login');
                }
            }
        });
}