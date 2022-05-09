import axios from 'axios';

export const dragToEmptyColumn = (boardItem,board)=>{
    if (boardItem.id === board.id) {
        axios
            .post('/api/task/status', {
                id: boardItem.items[0].id,
                status: boardItem.status,
            })
            .catch(err => console.log(err.message));
        return board;
    }
}