import axios from 'axios';

export const createBoard = (boardName, navigate) => {
    const unauthorizedUser = 401;
    
	axios
		.post('/api/board', { name: boardName })
		.then(res => {
			navigate(`/board/${res.data.id}`);
		})
		.catch(err => {
			if (err.response) {
				if (err.response.status === unauthorizedUser) {
					navigate('/login');
				}
			}
		});
};
