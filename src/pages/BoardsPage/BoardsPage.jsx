import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import { getBoardsStart } from '../../redux/actionCreators/boards';
import Header from '../../shared/Header/Header';
import DeleteBoardModal from '../../components/BoardsPage/DeleteBoardModal/DeleteBoardModal';
import './BoardsPage.scss';

const BoardsListPage = () => {
	const dispatch = useDispatch();
	const boards = useSelector(store => store.boardsReducer);
    const [boardId,setBoardId] = useState();
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		dispatch(getBoardsStart());
	}, []);
	return (
		<div className='boards-page-wrapper'>
			<Header />
			{boards.map(board => {
				return (
					<div className='board' key={board.id}>
						<NavLink to={`/board/${board.id}`}>
							<div className='left-part'>
								<h3>{board.name}</h3>
							</div>
							<div className='right-part'>
								<h4>{board.type}</h4>
								<div className='delete-icon' onClick={(e)=>{
									e.preventDefault();
									handleClickOpen();
									e.stopPropagation();
									setBoardId(board.id);
								}}>
									<DeleteIcon />
								</div>
								<h4>{moment(board.createdAt).format('YYYY-MM-DD.HH:mm:ss')}</h4>
							</div>
						</NavLink>
						<DeleteBoardModal open={open} handleClose={handleClose} boardId={boardId}/>
					</div>
				);
			})}
		</div>
	);
};

export default BoardsListPage;
