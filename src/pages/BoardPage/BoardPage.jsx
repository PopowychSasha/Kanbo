
import { useEffect, useState } from 'react';
import './BoardPage.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../shared/Header/Header';

const BoardPage = ()=>{
  const boardId = useParams().id;
  
  const[task,setTask] = useState('');
  const[boards,setBoards] = useState([
    {id:1,status:'UnDone',items:[/* {id:1,title:'11111111111'},{id:2,title:'222222222222222222'},{id:3,title:'3333333333333333'} */]},
    {id:2,status:'InProgress',items:[/* {id:4,title:'4444444444444444'},{id:5,title:'555555555555555'},{id:6,title:'6666666666666666666'} */]},
    {id:3,status:'Testing',items:[/* {id:7,title:'7777777777777777'},{id:8,title:'88888888888888888888'},{id:9,title:'99999999999999999999'} */]},
    {id:4,status:'Done',items:[/* {id:10,title:'101010101010101010'},{id:11,title:'1212121212121212'},{id:12,title:'131313131313131313'} */]}
  ]);
  
  useEffect(()=>{
    axios.post('/api/tasks/board',{
      boardId:boardId
    })
    .then((res=>{
      //console.log(res);
      const unDoneTask = res.data.filter(task=>{
        if(task.status==='UnDone'){
            return {
              id:task.id,
              name:task.name,
              createdAt:task.createdAt
            };
        }
      });
      let boardsClone = JSON.parse(JSON.stringify(boards));
      /* console.log('unDoneTask');
      console.log(unDoneTask); */
      boardsClone[0] = {id:1,status:'UnDone',items:[...unDoneTask]}
      setBoards([...boardsClone]);
      //=====================================

      const inProgressTask = res.data.filter(task=>{
        if(task.status==='InProgress'){
            return {
              id:task.id,
              name:task.name,
              createdAt:task.createdAt
            };
        }
      });

      boardsClone[1] = {id:2,status:'InProgress',items:[...inProgressTask]}
      setBoards([...boardsClone]);

      //=====================================

      const testingTask = res.data.filter(task=>{
        if(task.status==='Testing'){
            return {
              id:task.id,
              name:task.name,
              createdAt:task.createdAt
            };
        }
      });

      boardsClone[2] = {id:3,status:'Testing',items:[...testingTask]}
      setBoards([...boardsClone]);

      //=====================================

      const doneTask = res.data.filter(task=>{
        if(task.status==='Done'){
            return {
              id:task.id,
              name:task.name,
              createdAt:task.createdAt
            };
        }
      });

      boardsClone[3] = {id:4,status:'Done',items:[...doneTask]}
      setBoards([...boardsClone]);

    }));
 },[])

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
    
    axios.post('/api/task/status',{
      id:currentItem.id,
      status:board.items[0].status
    })
    .then(()=>{
      console.log('Change position');
    })
    .catch(err=>console.log(err.message))
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
    
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex,1);
    
    setBoards(boards.map((b)=>{
      if(b.id === board.id){
        axios.post('/api/task/status',{
          id:b.items[0].id,
          status:b.status
        }) 
        .then(()=>console.log('Inner change position'))
        .catch(err=>console.log(err.message))
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
    
    axios.post('/api/task',{taskName:task,boardId:boardId})
    .then(res=>{
      const boardsClone = JSON.parse(JSON.stringify(boards));
      boardsClone[0] = {id:1,status:'UnDone',items:[...boardsClone[0].items,{id:res.data.id,name:task}]}
      setBoards([...boardsClone]);
    })
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
              <h1>{board.status}</h1>
              <hr/>
              {
                board.items.map(item=>{
                  return <h2
                  style={board.status === 'UnDone' ? {background:'#65B1FC'} : 
                  board.status === 'InProgress' ? {background:'red'} : 
                  board.status === 'Testing' ? {background:'yellow'} : {background:'cadetblue'}}
                  className='board-task'
                  onDragOver={(e)=>dragOverHandler(e)}
                  onDragLeave={(e)=>dragLeaveHandler(e)}
                  onDragStart={(e)=>dragStartHandler(e,board,item)}
                  onDragEnd={(e)=>dragEndHandler(e)}
                  onDrop={(e)=>dropHandler(e,board,item)}
                  key={item.id} 
                  draggable={true}>{item.name}</h2>
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