import deleteIcon from "../img/delete.svg";
import editIcon from "../img/edit.svg";
import { useDrag } from "react-dnd";
import "./Cards.css";

export default function PostCard({ task, deletePost, onEdit }) {
  let typeColor = "";
  if (task.priority === "Urgent") {
    typeColor = "urgentColor";
  } else if (task.priority === "NotUrgent") {
    typeColor = "notUrgentColor";
  } else if (task.priority === "Bonus") {
    typeColor = "bonusColor";
  }

  const handleDeletePost = () => {
    deletePost(task.id);
  };

  const handleEditPost = () => {
    onEdit(task);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="noteContainer">
        <div className={`margin-right ${typeColor}`}></div>
        <div>
          <p className="titleTask">{task.text}</p>
          <p className="date">{task.createDate}</p>
          <p className="date">{task.priority}</p>
        </div>
      </div>
      <div className="cardActions">
        <div className="deleteIconDiv" onClick={handleEditPost}>
          <img src={editIcon} alt="Edit icon" className="deleteIcon" />
        </div>
        <div className="deleteIconDiv" onClick={handleDeletePost}>
          <img src={deleteIcon} alt="Delete icon" className="deleteIcon" />
        </div>
      </div>
    </div>
  );
}
