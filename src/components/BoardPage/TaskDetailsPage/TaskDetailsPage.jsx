
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './TaskDetailsPage.scss';
import { useNavigate, useParams } from 'react-router-dom';

const TaskDetailsPage = ()=>{
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const[details,setDetails] = useState('');
  const taskId = useParams().id;
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
    const details = editorRef.current.getContent();
    axios.post('/api/task/create/details',{taskId,details:details})
    .then(res=>{
        console.log(res);
        setDetails(res.data);
    })
    .catch(err=>{
        console.log(err.message);
    })
  };
  
  useEffect(()=>{
      axios.post('/api/task/details',{taskId:taskId})
      .then(res=>{
          console.log('use');
          console.log(res);
          setDetails(res.data.details);
      })
      .catch(err=>console.log(err.message))
  },[])

  return (
		<div>
			<SaveIcon style={{cursor:'pointer'}} onClick={log}>Save</SaveIcon>
			<ArrowBackIcon style={{cursor:'pointer'}} onClick={()=>navigate(-1)}>GoBack</ArrowBackIcon>
			<Editor
				onInit={(evt, editor) => (editorRef.current = editor)}
				onChange={e => console.log(e.target.value)}
				initialValue={details}
				init={{
					selector: 'textarea',
					toolbar:
						'undo redo | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',
					fontsize_formats:
						'8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
					content_style: 'body { font-size: 14pt; }',
					height: '95vh',
				}}
			/>
		</div>
	);
}

export default TaskDetailsPage;