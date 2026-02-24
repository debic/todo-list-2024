import React from 'react'
import { useEffect, useState } from 'react';
import ListMaping from './ListMaping'

export default function ListTasks({toDoList, setToDoList, deletePost}) {
  console.log(toDoList)
  const [toDo, setToDo] = useState([])
  const [inProgres, setInProgres] = useState([])
  const [done, setDone] = useState([])
  useEffect(() => {
    const filterToDo = toDoList.filter((list) => list.status === 'toDo')
    const filterInProgress = toDoList.filter((list) => list.status === 'InProgress')
    const filterDone = toDoList.filter((list) => list.status === 'done')
    setToDo(filterToDo)
    setInProgres(filterInProgress)
    setDone(filterDone)
    console.log(toDoList)
  },[toDoList])
  const statuses = ["toDo", "InProgress", "done"]

  return (
    <div className='folders'>
    {statuses.map((status, index) =>
    <ListMaping key={index} status={status} toDoList={toDoList} setToDoList={setToDoList} toDo={toDo} inProgres={inProgres} done={done} deletePost={deletePost}/>
    )}
        
  </div>
  )
}



