import React from "react";
import { useEffect, useState } from "react";
import ListMaping from "./ListMaping";

export default function ListTasks({
  toDoList,
  setToDoList,
  deletePost,
  setTaskToEdit,
}) {
  const [toDo, setToDo] = useState([]);
  const [inProgres, setInProgres] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    setToDo(toDoList.filter((task) => task.status === "toDo"));
    setInProgres(toDoList.filter((task) => task.status === "InProgress"));
    setDone(toDoList.filter((task) => task.status === "done"));
  }, [toDoList]);

  const statuses = ["toDo", "InProgress", "done"];

  return (
    <div className="folders">
      {statuses.map((status, index) => (
        <ListMaping
          key={index}
          status={status}
          toDoList={toDoList}
          setToDoList={setToDoList}
          toDo={toDo}
          inProgres={inProgres}
          done={done}
          deletePost={deletePost}
          setTaskToEdit={setTaskToEdit}
        />
      ))}
    </div>
  );
}
