import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './TaskDetailsPage.scss';
import { useNavigate, useParams } from 'react-router-dom';

const TaskDetailsPage = () => {
	const navigate = useNavigate();
	const editorRef = useRef(null);
	const [details, setDetails] = useState('');
	const taskId = useParams().id;
	const [isChanges, setIsChanges] = useState(false);
  console.log(`taskId=${taskId}`);

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

	useEffect(() => {
		axios
			.get(`/api/task/details/${taskId}`)
			.then(res => {
				setDetails(res.data.details);
			})
			.catch(err => console.log(err.message));
	}, []);

	return (
		<div className='details-task-wrapper'>
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
					height: '75vh',
					width: '75vw',
				}}
			/>
		</div>
	);
};

export default TaskDetailsPage;
