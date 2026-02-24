import deleteIcon from '../img/delete.svg';
import editIcon from '../img/edit.svg';
import { useDrag, useDrop } from "react-dnd"

export default function PostCard({ task, toDoList, setToDoList, deletePost }) {
    let typeColor = ''
    if(task.priority === 'Urgent'){
        typeColor= 'urgentColor'
    }else if(task.priority === 'NotUrgent'){
        typeColor= 'notUrgentColor'
    }else if(task.priority === 'Bonus'){
        typeColor= 'bonusColor'
    }
   
    const hanldeDeletePost = () => {
        deletePost(task.id)
    }
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <>
            <div ref={drag} className='card'>
                <div className='noteContainer'>
                    <div className={typeColor}>
                        
                    </div>
                    <div>
                        <p className='titleTask'>{task.text}</p>
                        <p className='date'>{task.createDate}</p>
                        <p className='date'>{task.priority}</p>
                    </div>
                </div>
                <div className="deleteIconDiv" onClick={hanldeDeletePost}>
                    <img src={deleteIcon} alt="Delete icon" className='deleteIcon' />
                </div>
            </div>
        </>
    )
}
