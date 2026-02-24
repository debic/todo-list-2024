import './App.css';
import { useEffect, useState } from 'react';
import TaskForm from './Components/TaskForm';
import ListTasks from './Components/ListTasks';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [toDoList, setToDoList] = useState([{
    id: "333",
    text: "hola",
    createDate: new Date().toLocaleDateString(),
    priority: "Urgent",
    status: 'toDo'
}])
  useEffect(()=>{
    if(localStorage.getItem("toDoList") != null){
      setToDoList(JSON.parse(localStorage.getItem("toDoList")))
    }
  }, [])

  const addPost = (newPost) => {
    const arrayWithNewPost = [newPost, ...toDoList]
    setToDoList(arrayWithNewPost)
    localStorage.setItem("toDoList", JSON.stringify(arrayWithNewPost))
    //console.log(arrayWithNewPost)
   // console.log(arrayWithNewPost)
  }
  const deletePost = (noteId) => {
    const copiedtodoList = [...toDoList]
    const deletedIdList = copiedtodoList.filter(note => note.id !== noteId)
    setToDoList(deletedIdList)
    localStorage.setItem("toDoList", JSON.stringify(deletedIdList))
  }
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <h1>To do list</h1>
      <TaskForm addPost={addPost} toDoList={toDoList} setToDoList={setToDoList}/>
      <ListTasks toDoList={toDoList} setToDoList={setToDoList} deletePost={deletePost}/>
    </div>
    </DndProvider>
  );
}

export default App;
