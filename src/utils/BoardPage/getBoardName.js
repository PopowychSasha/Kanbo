import axios from 'axios';
import { toast } from 'react-toastify';
import { getTasksForBoard } from '../getTaskForBoard';

export const getBoardName = (boardId,setBoardName,navigate,boards,setBoards)=>{
	const delayForCheckBoardAccess = 2000;
	const goToPreviousPage = -1;
	
    axios.get(`/api/board/name/${boardId}`)
		.then(res=>{
			setBoardName(res.data.name);
			getTasksForBoard(boardId, boards, setBoards);
		})
		.catch(()=>{
			toast.error('Access deny');
			setTimeout(()=>{
				navigate(goToPreviousPage);
			},delayForCheckBoardAccess);
		})
}