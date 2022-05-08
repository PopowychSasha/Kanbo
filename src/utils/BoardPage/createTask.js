import axios from 'axios';

export const createTask = (task,boardId,boards,setBoards)=>{
    axios
        .post('/api/task', { taskName: task, boardId: boardId })
        .then(res => {
            const boardsClone = JSON.parse(JSON.stringify(boards));
            boardsClone[0] = {
                id: 1,
                status: 'Todo',
                items: [...boardsClone[0].items, { id: res.data.id, name: task }],
            };
            setBoards([...boardsClone]);
        })
        .catch(err => console.log(err.message));
}