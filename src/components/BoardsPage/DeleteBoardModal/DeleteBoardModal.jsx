import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { getBoardsStart } from '../../../redux/actionCreators/boards';
import { deleteBoard } from '../../../utils/Board/deleteBoard';
import { CLOSE, DELETE, MESSAGE_ABOUTE_REMOVING_BOARD } from '../../../constants/BoardsPage';
import './DeleteBoardModal.scss';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DeleteBoardModal = ({ open, handleClose, boardId }) => {
	const dispatch = useDispatch();
	const removeBoards = () => {
		handleClose();
		deleteBoard(boardId,dispatch,getBoardsStart);
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
						{MESSAGE_ABOUTE_REMOVING_BOARD}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<button className='delete-button' onClick={removeBoards}>
						{DELETE}
					</button>
					<button className='close-modal' onClick={handleClose}>
						{CLOSE}
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DeleteBoardModal;
