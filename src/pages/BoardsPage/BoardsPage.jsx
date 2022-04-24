import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardsStart } from '../../redux/actionCreators/boards';
import Header from '../../shared/Header/Header';
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
				boards.map((board,index)=>{
					return (<div style={{border:'1px solid silver',height:'80px',width:'500px',margin:'auto',cursor:'pointer'}} key={index}>
						<h3>{board.name}</h3>
						<h4>{board.type}</h4>
						<h4>{board.createdAt}</h4>
					</div>)
				})
			}
		</div>
	);
};

export default BoardsListPage;
