import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../shared/Header/Header';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './BoardPage.scss';

const BoardPage = () => {
	const boardId = useParams().id;
    const [showAddTaskField,setShowAddTaskField] = useState(false);
	const [task, setTask] = useState('');
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		axios
			.post('/api/tasks/board', {
				boardId: boardId,
			})
			.then(res => {
				const todoTask = res.data.filter(task => {
					if (task.status === 'Todo') {
						return {
							id: task.id,
							name: task.name,
							createdAt: task.createdAt,
						};
					}
				});
				let boardsClone = JSON.parse(JSON.stringify(boards));
				boardsClone[0] = { id: 1, status: 'Todo', items: [...todoTask] };
				setBoards([...boardsClone]);
				//=====================================
				const inProgressTask = res.data.filter(task => {
					if (task.status === 'InProgress') {
						return {
							id: task.id,
							name: task.name,
							createdAt: task.createdAt,
						};
					}
				});
				boardsClone[1] = { id: 2, status: 'InProgress', items: [...inProgressTask] };
				setBoards([...boardsClone]);
				//=====================================
				const waitingTask = res.data.filter(task => {
					if (task.status === 'Waiting') {
						return {
							id: task.id,
							name: task.name,
							createdAt: task.createdAt,
						};
					}
				});
				boardsClone[2] = { id: 3, status: 'Waiting', items: [...waitingTask] };
				setBoards([...boardsClone]);
				//=====================================
				const doneTask = res.data.filter(task => {
					if (task.status === 'Done') {
						return {
							id: task.id,
							name: task.name,
							createdAt: task.createdAt,
						};
					}
				});
				boardsClone[3] = { id: 4, status: 'Done', items: [...doneTask] };
				setBoards([...boardsClone]);
			});
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
		if(task){
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

	return (
		<div className='board-page-wrapper'>
			<Header />
			<div className='board-wrapper'>
				{boards.map(board => {
					return (
						<div
							className='board-part'
							key={board.id}
							onDragOver={e => dragOverHandler(e)}
							onDrop={e => dropCardHandler(e, board)}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-around',
									alignItems: 'center',
								}}>
								<h1 style={{ color: 'teal' }}>{board.status}</h1>
								{board.status === 'Todo' && (
									<AddCircleIcon onClick={()=>setShowAddTaskField(p=>!p)} style={{ color: 'teal', cursor: 'pointer' }} />
								)}
							</div>
							<hr />
							<div className='tasks'>
								{board.items.map(item => {
									return (
										<h2
											style={
												board.status === 'Todo'
													? { background: '#65B1FC' }
													: board.status === 'InProgress'
													? { background: 'red' }
													: board.status === 'Waiting'
													? { background: 'orange' }
													: { background: 'cadetblue' }
											}
											className='board-task'
											onDragOver={e => dragOverHandler(e)}
											onDragLeave={e => dragLeaveHandler(e)}
											onDragStart={e => dragStartHandler(e, board, item)}
											onDragEnd={e => dragEndHandler(e)}
											onDrop={e => dropHandler(e, board, item)}
											key={item.id}
											draggable={true}>
											<Link to={`/task/details/${item.id}`} style={{ color: '#FFF' }}>
												{item.name}
											</Link>
										</h2>
									);
								})}
							</div>
							{board.status === 'Todo' && showAddTaskField && (
								<form onSubmit={createTaskHandler}>
									<input className='add-task-field' placeholder='task title' onChange={e => setTask(e.target.value)} value={task} />
								</form>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default BoardPage;
