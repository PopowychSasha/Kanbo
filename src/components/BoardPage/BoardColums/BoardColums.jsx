import AddCircleIcon from '@mui/icons-material/AddCircle';
import EdiText from 'react-editext';
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
								console.log(
									moment(item.deadLine).format('YYYY-MM-DD.HH:mm') <
										moment(new Date()).format('YYYY-MM-DD.HH:mm'),
								);
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
										className={
											moment(item.deadLine).format('YYYY-MM-DD.HH:mm') <
												moment(new Date()).format('YYYY-MM-DD.HH:mm') &&
											(item.status === 'Todo' ||
												item.status === 'InProgress' ||
												item.status === 'Waiting')
												? 'undone'
												: 'board-task'
										}
										
										onClick={e => {
											console.log(e);
											console.log(e.type);
											
											switch (e.detail) {
												
												case 2:
													if(e._targetInst===null){
														console.log('Delete on double click');
														console.log('navigatee');
														navigate(`/task/details/${item.id}`);
													}
													
													break;
												default:
													console.log('nothink1');
											}
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
												startEditingOnEnter={true}
												type='text'
												buttonsAlign='before'
												value={item.name}
												onSave={editTask => {editTask.preventDefault();onSavaEditTaskHandler(editTask, item.id)}}
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
