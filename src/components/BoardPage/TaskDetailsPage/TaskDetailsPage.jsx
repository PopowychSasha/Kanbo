import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './TaskDetailsPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeTaskStatus, getTaskDataStart } from '../../../redux/actionCreators/task';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import DeleteIcon from '@mui/icons-material/Delete';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { toast, ToastContainer } from 'react-toastify';

const TaskDetailsPage = () => {
	const navigate = useNavigate();
	const editorRef = useRef(null);
	const [details, setDetails] = useState('');
	const taskId = useParams().id;
	const [isChanges, setIsChanges] = useState(false);
	const taskData = useSelector(store => store.taskReducer);
	console.log('taskData');
	console.log(taskData);
	const [deadline, setDeadline] = useState(new Date());
	const dispatch = useDispatch();

	console.log('taskData()');
	console.log(taskData);

	const log = () => {
		setIsChanges(false);
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
		const details = editorRef.current.getContent();
		axios
			.post('/api/task/create/details', { taskId, details: details })
			.then(res => {
				setDetails(res.data);
			})
			.catch(err => {
				console.log(err.message);
			});
	};

	const changeTaskStatusHandler = (status)=>{
		dispatch(changeTaskStatus(status))
		axios
			.post('/api/task/status', {
				id: taskData.id,
				status: status,
			})
			.then(() => {
				console.log('Change position');
			})
			.catch(err => console.log(err.message));
	}
	useEffect(() => {
		dispatch(getTaskDataStart(taskId));
		axios
			.get(`/api/task/details/${taskId}`)
			.then(res => {
				setDetails(res.data.details);
			})
			.catch(err => {
				/* alert('AAA DEN'); */
				toast.error('Access deny');
				setTimeout(()=>{
					navigate(-1);
				},2000)
				console.log(err.message);
			});
	}, []);

	const deleteTaskHandler = ()=>{
		axios.delete(`/api/task/${taskId}`)
		.then(res=>{
			console.log(res);
			navigate(-1);
		})
		.catch(err=>console.log(err.message))
	}

	const setDeadLineForTask = ()=>{
		axios.post('/api/task/deadline',{
			taskId:taskId,
			deadline:moment(deadline).format('YYYY-MM-DD.HH:mm:ss')
		})
		.then(res=>console.log(res))
		.catch(err=>console.log(err))
	}
	
	return (
		<div className='details-task-wrapper'>
			<div style={{display:'flex'}}>
				<SaveIcon
					style={{
						cursor: 'pointer',
						fontSize: '50px',
						color: isChanges === true ? 'red' : 'teal',
					}}
					onClick={log}>
					Save
				</SaveIcon>
				<ArrowBackIcon
					style={{ cursor: 'pointer', fontSize: '50px' }}
					onClick={() => navigate(-1)}>
					GoBack
				</ArrowBackIcon>
				<div className='task-status-type'>
					<div className={taskData.status === 'Todo' && 'active'} onClick={()=>changeTaskStatusHandler('Todo')}>Todo</div>
					<div className={taskData.status === 'InProgress' && 'active'} onClick={()=>changeTaskStatusHandler('InProgress')}>InProgress</div>
					<div className={taskData.status === 'Waiting' && 'active'} onClick={()=>changeTaskStatusHandler('Waiting')}>Waiting</div>
					<div className={taskData.status === 'Done' && 'active'} onClick={()=>changeTaskStatusHandler('Done')}>Done</div>
					
					<DeleteIcon className='delete-task-icon' onClick={()=>deleteTaskHandler()}/>
				</div>
			</div>
			
			<h3>
				<h2 title='taskTitle'>
					name is {taskData.name}
				</h2>
				<div title='createdAt'>
					Created at {moment(taskData.createdAt).format('YYYY-MM-DD.HH:mm')}
				</div>
			</h3>
			
			<div style={{position:'absolute',zIndex:'1',top:'160px'}}>
				<DateTimePicker onChange={setDeadline} value={deadline} />
				<BeenhereIcon onClick={setDeadLineForTask}/>
				<span>{moment(taskData.deadLine).format('YYYY-MM-DD.HH:mm:ss')}</span>
			</div>
			<div style={{position:'absolute',zIndex:'0',top:'210px'}}>
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

export default TaskDetailsPage;
