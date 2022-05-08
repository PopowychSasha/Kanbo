import axios from 'axios';

export const deleteBoard = (boardId,dispatch,getBoardsStart)=>{
    axios
        .delete(`/api/delete/board/${boardId}`)
        .then(() => {
            dispatch(getBoardsStart());
        })
        .catch(err => console.log(err.message));
}