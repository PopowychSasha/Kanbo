import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import DateTimePicker from 'react-datetime-picker';
import EdiText from 'react-editext';
import moment from 'moment';
import { Editor } from '@tinymce/tinymce-react';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { changeTaskStatus, getTaskDataStart } from '../../../redux/actionCreators/task';
import { createTaskDetails } from '../../../utils/TaskDetailsPage/createTaskDetails';
import { changeStatus } from '../../../utils/TaskDetailsPage/changeTaskStatus';
import { getTaskDetails } from '../../../utils/TaskDetailsPage/getTaskDetails';
import { deleteTask } from '../../../utils/TaskDetailsPage/deleteTask';
import { setDeadLineForTask } from '../../../utils/TaskDetailsPage/setDeadLineForTask';
import { editTaskHandler } from '../../../utils/TaskDetailsPage/editTask';
import { CREATED_AT, DEADLINE, DONE, GO_BACK, IN_PROGRESS, SAVE, TODO, WAITING } from '../../../constants/TaskDetails';
import './TaskDetailsPage.scss';

const TaskDetailsPage = () => {
	const navigate = useNavigate();
	const editorRef = useRef(null);
	const [details, setDetails] = useState('');
	const taskId = useParams().id;
	const [isChanges, setIsChanges] = useState(false);
	const taskData = useSelector(store => store.taskReducer);
	const [deadline, setDeadline] = useState(new Date());
	const dispatch = useDispatch();

	const moveToPreviousPage = -1;

	const log = () => {
		setIsChanges(false);
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
		const details = editorRef.current.getContent();
		
		createTaskDetails(taskId, details, setDetails);
	};

	const changeTaskStatusHandler = status => {
		dispatch(changeTaskStatus(status));
		changeStatus(taskData.id,status);
	};
	useEffect(() => {
		dispatch(getTaskDataStart(taskId));
		getTaskDetails(taskId,setDetails,navigate);
	}, []);

	const deleteTaskHandler = () => {
		deleteTask(taskId,navigate);
	};

	const setDeadLineForTaskHandler = () => {
		setDeadLineForTask(taskId,deadline);
	};

	const onSavaEditTaskHandler = (editTask, taskId) => {
		if (editTask !== '') {
			editTaskHandler(editTask,taskId);
		}
	};

	return (
		<div className='details-task-wrapper'>
			<div>
				<DateTimePicker onChange={setDeadline} value={deadline} />
				<BeenhereIcon style={{ cursor: 'pointer' }} onClick={setDeadLineForTaskHandler} />
			</div>
			<div style={{ display: 'flex' }}>
				<div className='task-status-type'>
					<SaveIcon
						style={{
							cursor: 'pointer',
							fontSize: '30px',
							color: isChanges === true ? 'red' : 'teal',
						}}
						onClick={log}>
						{SAVE}
					</SaveIcon>
					<ArrowBackIcon
						className='arrow-back-icon'
						onClick={() => navigate(moveToPreviousPage)}>
						{GO_BACK}
					</ArrowBackIcon>
					<div
						className={taskData.status === 'Todo' && 'active'}
						onClick={() => changeTaskStatusHandler('Todo')}>
						{TODO}
					</div>
					<div
						className={taskData.status === 'InProgress' && 'active'}
						onClick={() => changeTaskStatusHandler('InProgress')}>
						{IN_PROGRESS}
					</div>
					<div
						className={taskData.status === 'Waiting' && 'active'}
						onClick={() => changeTaskStatusHandler('Waiting')}>
						{WAITING}
					</div>
					<div
						className={taskData.status === 'Done' && 'active'}
						onClick={() => changeTaskStatusHandler('Done')}>
						{DONE}
					</div>
					<DeleteIcon className='delete-task-icon' onClick={() => deleteTaskHandler()} />
				</div>
			</div>

			<h3>
				<EdiText
					startEditingOnEnter={true}
					type='text'
					buttonsAlign='after'
					value={taskData.name}
					onSave={editTask => {
						onSavaEditTaskHandler(editTask, taskData.id);
					}}
				/>
			</h3>
			<div className='task-info'>
				<div>{CREATED_AT} {moment(taskData.createdAt).format('YYYY-MM-DD.HH:mm')}</div>
				<div>{DEADLINE} {taskData.deadLine ? moment(taskData.deadLine).format('YYYY-MM-DD.HH:mm:ss') : <span>missing</span>}</div>
			</div>

			<div className='calendar'>
				<Editor
					onInit={(evt, editor) => (editorRef.current = editor)}
					onEditorChange={() => {
						setIsChanges(true);
					}}
					initialValue={details}
					init={{
						selector: 'textarea',
						toolbar:
							'undo redo | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
						fontsize_formats:
							'8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
						content_style: 'body { font-size: 14pt; }',
						height: '65vh',
						width: '75vw',
					}}
				/>
			</div>
			<ToastContainer
				limit={1}
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

export default TaskDetailsPage;
