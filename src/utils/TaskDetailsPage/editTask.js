import axios from 'axios';

export const editTaskHandler = (editTask, taskId) => {
	axios
		.post('/api/task/edit', { taskId: taskId, editTask: editTask })
		.catch(err => console.log(err.message));
};
