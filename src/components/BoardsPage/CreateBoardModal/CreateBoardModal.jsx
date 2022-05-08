import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Dialog, DialogActions, FormControl, RadioGroup, TextField } from '@mui/material';
import './CreateBoardModal.scss';
import { createBoard } from '../../../utils/Board/createBoard';
import { CLOSE, CREATE } from '../../../constants/BoardsPage';


const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const CreateBoardModal = ({ handleClickClose }) => {
	const [boardName, setBoardName] = useState('');
	const navigate = useNavigate();
	const onChangeBoardNameHandler = e => {
		setBoardName(e.target.value);
	};

	const createBoardHandler = () => {
		if (boardName) {
			createBoard(boardName,navigate);
			handleClickClose();
		} else {
			toast.warning('Name and type of board must be selected');
		}
	};
	return (
		<div>
			<Dialog
				sx={{ height: '380px' ,marginTop:'200px'}}
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClickClose}
				aria-describedby='alert-dialog-slide-description'>
				
				<DialogTitle sx={{ fontSize: '35px' }}>{'Create new board'}</DialogTitle>
				<div>
					<hr />
				</div>
				<FormControl className='form-control'>
					<RadioGroup
						aria-labelledby='demo-radio-buttons-group-label'
						defaultValue='female'
						name='radio-buttons-group'>
						<TextField
							onChange={onChangeBoardNameHandler}
							id='outlined-basic'
							label='board name'
							variant='outlined'
							sx={{ width: '50%', margin: 'auto', marginTop: '50px' }}
						/>
					</RadioGroup>
				</FormControl>
				<DialogActions>
					<button className='close-button' onClick={handleClickClose}>
						{CLOSE}
					</button>
					<button className='create-button' onClick={createBoardHandler}>
						{CREATE}
					</button>
				</DialogActions>
				<ToastContainer
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
			</Dialog>
		</div>
	);
};

export default CreateBoardModal;
