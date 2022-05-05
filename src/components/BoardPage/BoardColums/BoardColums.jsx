import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
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
	return (
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
							<h2 style={{ color: 'teal' }}>{board.status}</h2>
							{board.status === 'Todo' && (
								<AddCircleIcon
									onClick={() => setShowAddTaskField(p => !p)}
									style={{ color: 'teal', cursor: 'pointer' }}
								/>
							)}
						</div>
						<hr />
						<div className='tasks'>
							{board.items.map(item => {
								console.log(
									moment(item.deadLine).format('YYYY-MM-DD.HH:mm') <
										moment(new Date()).format('YYYY-MM-DD.HH:mm'),
								);
								return (
									<h4
										style={
											board.status === 'Todo'
												? { background: '#65B1FC' }
												: board.status === 'InProgress'
												? { background: 'red' }
												: board.status === 'Waiting'
												? { background: 'orange' }
												: { background: 'cadetblue' }
										}
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
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												padding: '0px 10px',
											}}>
											<div className="task">
												{item.name}
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
