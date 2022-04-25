import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './DeleteBoardModal.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getBoardsStart } from '../../../redux/actionCreators/boards';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteBoardModal = ({open,handleClose,boardId}) => {
  const dispatch = useDispatch();
  console.log(`boardId==${boardId}`);
  const removeBoards = ()=>{
      axios.post('/api/board/delete',{boardId:boardId})
      .then((res)=>{
        console.log(res);
        dispatch(getBoardsStart());
        handleClose();
      })
      .catch(err=>console.log(err.message));
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete board"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
             Do you really want to remove this board? 
             The board and absolutely all tasks for 
             it will be deleted forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='delete-button' onClick={removeBoards}>Delete</button>
          <button className='close-modal' onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteBoardModal;