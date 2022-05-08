import axios from 'axios';
import { toast } from 'react-toastify';
import { getTasksForBoard } from '../getTaskForBoard';

export const getBoardName = (boardId,setBoardName,navigate,boards,setBoards)=>{
    axios.get(`/api/board/name/${boardId}`)
		.then(res=>{
			setBoardName(res.data.name);
			getTasksForBoard(boardId, boards, setBoards);
		})
		.catch(()=>{
			toast.error('Access deny');
			setTimeout(()=>{
				navigate(-1);
			},2000);
		})
}