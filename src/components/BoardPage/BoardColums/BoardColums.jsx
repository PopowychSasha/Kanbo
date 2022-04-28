import AddCircleIcon from '@mui/icons-material/AddCircle';
import EdiText from 'react-editext';
import { useNavigate } from 'react-router-dom';
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
	onSavaEditTaskHandler,
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
							<h1 style={{ color: 'teal' }}>{board.status}</h1>
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
										onDoubleClick={() => {
											console.log('Delete on double click');
											console.log('navigatee');
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
											<EdiText
												style={{
													display: 'flex',
													margin: 'auto',
													width: '100%',
													alignItems: 'flex-end',
												}}
												type='text'
												buttonsAlign='before'
												value={item.name}
												onSave={editTask => onSavaEditTaskHandler(editTask, item.id)}
											/>
										</div>
									</h2>
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
