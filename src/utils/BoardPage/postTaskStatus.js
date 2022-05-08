import axios from "axios";

export const postTaskStatus = (id,board,setBoards,boards,currentBoard)=>{
    axios
        .post('/api/task/status', {
            id: id,
            status: board.items[0].status,
        })
        .catch(err => console.log(err.message));
        setBoards(
            boards.map(b => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === id) {
                    return currentBoard;
                }
                return b;
            }),
        );
}