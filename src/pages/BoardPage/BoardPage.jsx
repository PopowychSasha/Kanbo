
import { useState } from 'react';
import './BoardPage.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../shared/Header/Header';

const BoardPage = ()=>{
  const boardId = useParams().id;
  console.log(`boardId=${boardId}`);
  const[task,setTask] = useState('');
  const[boards,setBoards] = useState([
    {id:1,title:'UnDone',items:[/* {id:1,title:'11111111111'},{id:2,title:'222222222222222222'},{id:3,title:'3333333333333333'} */]},
    {id:2,title:'InProgress',items:[/* {id:4,title:'4444444444444444'},{id:5,title:'555555555555555'},{id:6,title:'6666666666666666666'} */]},
    {id:3,title:'Testing',items:[/* {id:7,title:'7777777777777777'},{id:8,title:'88888888888888888888'},{id:9,title:'99999999999999999999'} */]},
    {id:4,title:'Done',items:[/* {id:10,title:'101010101010101010'},{id:11,title:'1212121212121212'},{id:12,title:'131313131313131313'} */]}
  ]);

  const[currentBoard,setCurrentBoard] = useState(null);
  const[currentItem,setCurrentItem] = useState(null);

  const dragOverHandler = (e)=>{
    e.preventDefault();
    if(e.target.className === 'item'){
      e.target.style.boxShadow = '0 2px 3px gray';
    }
  }
  const dragLeaveHandler = (e)=>{
    e.target.style.boxShadow = 'none';
  }
  const dragStartHandler = (e,board,item)=>{
    console.log(e);
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  const dragEndHandler = (e)=>{
    e.target.style.boxShadow = 'none';
  }
  const dropHandler = (e,board,item)=>{
    e.preventDefault();
    e.stopPropagation();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex,1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(boards.map(b=>{
        if(b.id === board.id){
          return board;
        }
        if(b.id === currentBoard.id){
          return currentBoard;
        }
        return b;
    }));
  }

  const dropCardHandler = (e,board)=>{
    board.items.push(currentItem);
    console.log(currentBoard);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex,1);
    setBoards(boards.map(b=>{
      if(b.id === board.id){
        return board;
      }
      if(b.id === currentBoard.id){
        return currentBoard;
      }
      return b;
  }));
  }

  const createTaskHandler = (e)=>{
    e.preventDefault();
    const boardsClone = JSON.parse(JSON.stringify(boards));
    boardsClone[0] = {id:1,title:'UnDone',items:[...boardsClone[0].items,{id:Math.random(),title:task}]}
    setBoards([...boardsClone]);

    axios.post('/api/task',{taskName:task,boardId:boardId})
    .then(res=>console.log(res))
    .catch(err=>console.log(err.message));

    setTask('');
  }

  return(
    <div className='board-page-wrapper'>
      <Header/>
      <div className='board-wrapper'>
      {
        boards.map(board=>{
          return <div className='board-part' key={board.id} 
                  onDragOver={(e)=>dragOverHandler(e)}
                  onDrop={(e)=>dropCardHandler(e,board)}
                  >
              <h1>{board.title}</h1>
              <hr/>
              {
                board.items.map(item=>{
                  return <h2
                  className='board-task'
                  onDragOver={(e)=>dragOverHandler(e)}
                  onDragLeave={(e)=>dragLeaveHandler(e)}
                  onDragStart={(e)=>dragStartHandler(e,board,item)}
                  onDragEnd={(e)=>dragEndHandler(e)}
                  onDrop={(e)=>dropHandler(e,board,item)}
                  key={item.id} 
                  draggable={true}>{item.title}</h2>
                })
              }
          </div>
        })
      }
     
    </div>
    <form onSubmit={createTaskHandler}>
        <input onChange={(e)=>setTask(e.target.value)} value={task}/>
      </form>
  </div>
  )
}

export default BoardPage;