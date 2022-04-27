import { forwardRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { getBoardsStart } from '../../../redux/actionCreators/boards';
import './DeleteBoardModal.scss';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DeleteBoardModal = ({ open, handleClose, boardId }) => {
	const dispatch = useDispatch();
	const removeBoards = () => {
    handleClose();
		axios
			.delete(`/api/delete/board/${boardId}`)
			.then(() => {
        console.log('getBoardsStart!');
				dispatch(getBoardsStart());
			})
			.catch(err => console.log(err.message));
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>{'Delete board'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						Do you really want to remove this board? The board and absolutely all tasks
						for it will be deleted forever.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<button className='delete-button' onClick={removeBoards}>
						Delete
					</button>
					<button className='close-modal' onClick={handleClose}>
						Close
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DeleteBoardModal;
