import axios from 'axios';

export const getTasksForBoard = (boardId,boards,setBoards)=>{
	axios
	.get(`/api/tasks/board/${boardId}`)
	.then(res => {
		const {todoTask,inProgressTask,waitingTask,doneTask} = filterTasks(res);
		let boardsClone = JSON.parse(JSON.stringify(boards));
		boardsClone[0] = { id: 1, status: 'Todo', items: [...todoTask] };
		setBoards([...boardsClone]);
		
		boardsClone[1] = { id: 2, status: 'InProgress', items: [...inProgressTask] };
		setBoards([...boardsClone]);
		
		boardsClone[2] = { id: 3, status: 'Waiting', items: [...waitingTask] };
		setBoards([...boardsClone]);
		
		boardsClone[3] = { id: 4, status: 'Done', items: [...doneTask] };
		setBoards([...boardsClone]);
	});
}

function filterTasks(res){
	const todoTask = res.data.filter(task => {
		if (task.status === 'Todo') {
			return {
				id: task.id,
				name: task.name,
				createdAt: task.createdAt,
			};
		}
	});
	const inProgressTask = res.data.filter(task => {
		if (task.status === 'InProgress') {
			return {
				id: task.id,
				name: task.name,
				createdAt: task.createdAt,
			};
		}
	});
	const waitingTask = res.data.filter(task => {
		if (task.status === 'Waiting') {
			return {
				id: task.id,
				name: task.name,
				createdAt: task.createdAt,
			};
		}
	});
	const doneTask = res.data.filter(task => {
		if (task.status === 'Done') {
			return {
				id: task.id,
				name: task.name,
				createdAt: task.createdAt,
			};
		}
	});
	return {todoTask,inProgressTask,waitingTask,doneTask}
}