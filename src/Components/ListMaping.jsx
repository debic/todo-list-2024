import Cards from './Cards';
import { useDrag, useDrop } from "react-dnd"

export default function ListMaping({ status, toDoList, setToDoList, toDo, inProgres, done, deletePost }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  let title = "To do"
  let taskToMap = toDo

  if (status === 'InProgress') {
    title = "In progress"
    taskToMap = inProgres
  }
  if (status === 'done') {
    title = "Done"
    taskToMap = done
  }

  const addItemToSection = (id) => {
    setToDoList(prev => {
      const mTasks = prev.map(t => {
        if (t.id === id) {
          return { ...t, status: status }
        }
        return t
      })
      return mTasks
    })

  }

  return (
    <div ref={drop} className='Section'>
      <div className='headerSection'>
        <h2>{title}</h2>
        <p className='count'>{taskToMap.length}</p>
      </div>
      {taskToMap.length > 0 && taskToMap.map((task) => {
        return <Cards deletePost={deletePost} key={task.id} task={task} toDoList={toDoList} setToDoList={setToDoList} />
      })}
    </div>
  )
}
