import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './BoardColums.scss';

const BoardColums = ({
	boards,
	dragOverHandler,
	dropCardHandler,
	setShowAddTaskField,
	dragLeaveHandler,
	dragStartHandler,
	dragEndHandler,
	dropHandler,
	showAddTaskField,
	createTaskHandler,
	setTask,
	task,
}) => {
	const navigate = useNavigate();

	const setTaskBackground = status => {
		let background = '';

		if(status === 'Todo') background = '#65B1FC';
		else if(status === 'InProgress') background = 'red'
		else if(status === 'Waiting') background = 'orange'
		else background = 'cadetblue'
		return background;
	};
	
	return (
		<div className='board-wrapper'>
			{boards.map(board => {
				return (
					<div
						className='board-part'
						key={board.id}
						onDragOver={e => dragOverHandler(e)}
						onDrop={e => dropCardHandler(e, board)}>
						<div className='board-title'>
							<h2>{board.status}</h2>
							{board.status === 'Todo' && (
								<AddCircleIcon
									onClick={() => setShowAddTaskField(p => !p)}
									className='add-circle-icon'
								/>
							)}
						</div>
						<hr />
						<div className='tasks'>
							{board.items.map(item => {
								return (
									<h4
										style={{ background: setTaskBackground(board.status) }}
										className={
											moment(item.deadLine).format('YYYY-MM-DD.HH:mm') <
												moment(new Date()).format('YYYY-MM-DD.HH:mm') &&
											(item.status === 'Todo' ||
												item.status === 'InProgress' ||
												item.status === 'Waiting')
												? 'undone'
												: 'board-task'
										}
										onClick={() => {
											navigate(`/task/details/${item.id}`);
										}}
										onDragOver={e => dragOverHandler(e)}
										onDragLeave={e => dragLeaveHandler(e)}
										onDragStart={e => dragStartHandler(e, board, item)}
										onDragEnd={e => dragEndHandler(e)}
										onDrop={e => dropHandler(e, board, item)}
										key={item.id}
										draggable={true}>
										<div className='task-wrapper'>
											<div className='task'>
												<div className='task-name'>{item.name}</div>
												<span className='dead-line'>
													{item.deadLine
														? moment(item.deadLine).format('MM-DD.HH:mm')
														: 'missing'}
												</span>
											</div>
										</div>
									</h4>
								);
							})}
						</div>
						{board.status === 'Todo' && showAddTaskField && (
							<form onSubmit={createTaskHandler}>
								<input
									className='add-task-field'
									placeholder='task title'
									onChange={e => setTask(e.target.value)}
									value={task}
								/>
							</form>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default BoardColums;
