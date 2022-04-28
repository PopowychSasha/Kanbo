import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../shared/Header/Header';
import './BoardPage.scss';
import { getTasksForBoard } from '../../utils/getTaskForBoard';
import BoardColums from '../../components/BoardPage/BoardColums/BoardColums';

const BoardPage = () => {
	const boardId = useParams().id;
	const [showAddTaskField, setShowAddTaskField] = useState(false);
	const [task, setTask] = useState('');
	const [boards, setBoards] = useState([]);
	const [boardName,setBoardName] = useState('');

	useEffect(() => {
		getTasksForBoard(boardId, boards, setBoards);
		axios.get(`/api/board/name/${boardId}`)
		.then(res=>setBoardName(res.data.name))
		.catch(err=>console.log(err.message))
	}, []);

	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);

	const dragOverHandler = e => {
		e.preventDefault();
		if (e.target.className === 'item') {
			e.target.style.boxShadow = '0 2px 3px gray';
		}
	};
	const dragLeaveHandler = e => {
		e.target.style.boxShadow = 'none';
	};
	const dragStartHandler = (e, board, item) => {
		setCurrentBoard(board);
		setCurrentItem(item);
	};
	const dragEndHandler = e => {
		e.target.style.boxShadow = 'none';
	};
	const dropHandler = (e, board, item) => {
		e.preventDefault();
		e.stopPropagation();
		const currentIndex = currentBoard.items.indexOf(currentItem);

		currentBoard.items.splice(currentIndex, 1);
		const dropIndex = board.items.indexOf(item);

		board.items.splice(dropIndex + 1, 0, currentItem);
		
		axios
			.post('/api/task/status', {
				id: currentItem.id,
				status: board.items[0].status,
			})
			.then(() => {
				console.log('Change position');
			})
			.catch(err => console.log(err.message));
		setBoards(
			boards.map(b => {
				if (b.id === board.id) {
					return board;
				}
				if (b.id === currentBoard.id) {
					return currentBoard;
				}
				return b;
			}),
		);
	};

	const dropCardHandler = (e, board) => {
		board.items.push(currentItem);

		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);

		setBoards(
			boards.map(b => {
				if (b.id === board.id) {
					axios
						.post('/api/task/status', {
							id: b.items[0].id,
							status: b.status,
						})
						.then(() => console.log('Inner change position'))
						.catch(err => console.log(err.message));
					return board;
				}
				if (b.id === currentBoard.id) {
					return currentBoard;
				}

				return b;
			}),
		);
	};

	const createTaskHandler = e => {
		
		e.preventDefault();
		if (task) {
			setShowAddTaskField(false);
			axios
				.post('/api/task', { taskName: task, boardId: boardId })
				.then(res => {
					const boardsClone = JSON.parse(JSON.stringify(boards));
					boardsClone[0] = {
						id: 1,
						status: 'Todo',
						items: [...boardsClone[0].items, { id: res.data.id, name: task }],
					};
					setBoards([...boardsClone]);
				})
				.catch(err => console.log(err.message));
		}

		setTask('');
	};

	const onSavaEditTaskHandler = (editTask, taskId) => {
		if (editTask !== '') {
			axios
				.post('/api/task/edit', { taskId: taskId, editTask: editTask })
				.then(res => console.log(res))
				.catch(err => console.log(err.message));
		}
	};
	return (
		<div className='board-page-wrapper'>
			<Header />
			<h2 className='board-name'>{boardName}</h2>
			<BoardColums
				boards={boards}
				dragOverHandler={dragOverHandler}
				dropCardHandler={dropCardHandler}
				setShowAddTaskField={setShowAddTaskField}
				dragLeaveHandler={dragLeaveHandler}
				dragStartHandler={dragStartHandler}
				dragEndHandler={dragEndHandler}
				dropHandler={dropHandler}
				onSavaEditTaskHandler={onSavaEditTaskHandler}
				showAddTaskField={showAddTaskField}
				createTaskHandler={createTaskHandler}
				setTask={setTask}
				task={task}
			/>
		</div>
	);
};

export default BoardPage;
