import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {ToastContainer } from 'react-toastify';
import axios from 'axios';
import Header from '../../shared/Header/Header';
import BoardColums from '../../components/BoardPage/BoardColums/BoardColums';
import { getBoardName } from '../../utils/BoardPage/getBoardName';
import { createTask } from '../../utils/BoardPage/createTask';
import { postTaskStatus } from '../../utils/BoardPage/postTaskStatus';
import { dragToEmptyColumn } from '../../utils/BoardPage/dragToEmptyColumn';
import './BoardPage.scss';

const BoardPage = () => {
	const boardId = useParams().id;
	const [showAddTaskField, setShowAddTaskField] = useState(false);
	const [task, setTask] = useState('');
	const [boards, setBoards] = useState([]);
	const [boardName,setBoardName] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		getBoardName(boardId,setBoardName,navigate,boards,setBoards);
	}, []);

	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);

	const dragOverHandler = e => {
		e.preventDefault();
	};
	const dragLeaveHandler = () => {
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
		e.stopPropagation();
		const currentIndex = currentBoard.items.indexOf(currentItem);

		currentBoard.items.splice(currentIndex, 1);
		const dropIndex = board.items.indexOf(item);

		board.items.splice(dropIndex + 1, 0, currentItem);
		
		postTaskStatus(currentItem.id,board,setBoards,boards,currentBoard);
		
	};

	const dropCardHandler = (e, board) => {
		board.items.push(currentItem);
		
		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);

		postTaskStatus(currentItem.id,board,setBoards,boards,currentBoard);
		
		setBoards(
			boards.map(boardItem => {
				dragToEmptyColumn(boardItem,board);
				if (boardItem.id === currentBoard.id) {
					return currentBoard;
				}
				return boardItem;
			}),
		);
	};

	const createTaskHandler = e => {
		e.preventDefault();
		if (task) {
			setShowAddTaskField(false);
			createTask(task,boardId,boards,setBoards);
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
			<ToastContainer limit={1}
					position='bottom-right'
					autoClose={1500}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
		</div>
	);
};

export default BoardPage;
