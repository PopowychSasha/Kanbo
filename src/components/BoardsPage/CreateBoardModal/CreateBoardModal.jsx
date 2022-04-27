import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {
	Dialog,
	DialogActions,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import './CreateBoardModal.scss';
import { ToastContainer, toast } from 'react-toastify';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const CreateBoardModal = ({ handleClickClose }) => {
	const [boardType, setBoardType] = useState('');
	const [boardName, setBoardName] = useState('');
	const navigate = useNavigate();

	const setBoardTypeHandler = e => {
		setBoardType(e.target.value);
	};
	console.log(`boardName=${boardName}`);
	const onChangeBoardNameHandler = e => {
		setBoardName(e.target.value);
	};

	const createBoardHandler = () => {
		if (boardType && boardName) {
			axios
				.post('/api/board', { name: boardName, type: boardType })
				.then(res => {
					console.log(res);
					navigate(`/board/${res.data.id}`);
				})
				.catch(err => console.log(err.message));
			handleClickClose();
		} else {
			toast.warning('Name and type of board must be selected');
		}
	};
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClickClose}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle sx={{ fontSize: '35px' }}>{'Create new board'}</DialogTitle>
				<div>
					<hr />
				</div>
				<FormControl sx={{ width: 500, height: 200 }}>
					<RadioGroup
						aria-labelledby='demo-radio-buttons-group-label'
						defaultValue='female'
						name='radio-buttons-group'>
						<TextField
							onChange={onChangeBoardNameHandler}
							id='outlined-basic'
							label='board name'
							variant='outlined'
							sx={{ width: '50%', margin: 'auto', marginTop: '30px' }}
						/>
						<div className='radio-type-wrapper'>
							<FormControlLabel
								onClick={setBoardTypeHandler}
								value='single'
								control={<Radio />}
								label='SINGLE BOARD'
							/>
							<FormControlLabel
								onClick={setBoardTypeHandler}
								value='command'
								control={<Radio />}
								label='COMMAND  BOARD'
							/>
						</div>
					</RadioGroup>
				</FormControl>
				<DialogActions>
					<button className='close-button' onClick={handleClickClose}>
						Close
					</button>
					<button className='create-button' onClick={createBoardHandler}>
						Create
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
