import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBoardsStart } from '../../redux/actionCreators/boards';
import Header from '../../shared/Header/Header';
import moment from 'moment';
import './BoardsPage.scss';

const BoardsListPage = () => {
	const dispatch = useDispatch();
    const boards = useSelector(store=>store.boardsReducer);

	useEffect(()=>{
        dispatch(getBoardsStart());
	},[])
	return (
		<div className='boards-page-wrapper'>
			<Header />	
			{
				boards.map((board)=>{
					return (<div className='board' key={board.id}>
						
							<NavLink to={`/board/${board.id}`}>
								<div className='left-part'>
									<h3>{board.name}</h3>
								</div>
								<div className='right-part'>
									<h4>{board.type}</h4>
									<h4>{moment(board.createdAt).format('YYYY-MM-DD.HH:mm:ss')}</h4>
								</div>
							</NavLink>
							</div>)
				})
			}		
		</div>
	);
};

export default BoardsListPage;
