import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TaskForm.css";

export default function TaskForm({
  addPost,
  taskToEdit,
  setTaskToEdit,
  editPost,
}) {
  const [text, setText] = useState("");
  const [type, setType] = useState("Urgent");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  // Si llega una tarea para editar, abrir el modal pre-rellenado
  useEffect(() => {
    if (taskToEdit) {
      setText(taskToEdit.text);
      setType(taskToEdit.priority);
      setError(false);
      setShow(true);
    }
  }, [taskToEdit]);

  const handleClose = () => {
    setShow(false);
    setText("");
    setType("Urgent");
    setError(false);
    if (setTaskToEdit) setTaskToEdit(null);
  };

  const handleShow = () => setShow(true);

  const handlePostText = (e) => {
    setText(e.target.value);
    if (e.target.value.trim()) setError(false);
  };

  const handleSelect = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError(true);
      return;
    }

    if (taskToEdit) {
      // Modo edición: conserva id, fecha y status originales
      editPost({
        ...taskToEdit,
        text: text.trim(),
        priority: type,
      });
    } else {
      // Modo creación
      addPost({
        id: nanoid(),
        text: text.trim(),
        createDate: new Date().toLocaleDateString(),
        priority: type,
        status: "toDo",
      });
    }

    handleClose();
  };

  const isEditing = !!taskToEdit;

  return (
    <>
      <Button className="mainCTA" onClick={handleShow}>
        Add task
      </Button>
      <Modal show={show} onHide={handleClose}>
        <div className="modalHeader">
          <h2 className="modalTitle">
            {isEditing ? "Edit Task" : "Plan Something New"}
          </h2>
          <p className="modalDescription">
            {isEditing
              ? "Update the task details below."
              : "Every goal starts with a small step. Add a task, choose its priority, and give yourself a clear next move."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="sectionForm">
            <Form.Label className="label" htmlFor="taskText">
              To Do
            </Form.Label>
            <Form.Control
              id="taskText"
              onChange={handlePostText}
              className={`textArea ${error ? "is-invalid" : ""}`}
              as="textarea"
              rows={3}
              name="text"
              value={text}
            />
            {error && (
              <div className="invalidMessage">
                Please write something before saving.
              </div>
            )}
          </div>
          <div className="sectionForm">
            <Form.Label className="label label2" htmlFor="taskType">
              Type
            </Form.Label>
            <Form.Select id="taskType" onChange={handleSelect} value={type}>
              <option value="Urgent">Urgent</option>
              <option value="NotUrgent">Not Urgent</option>
              <option value="Bonus">Bonus</option>
            </Form.Select>
          </div>
          <div className="sectionButtons">
            <Button className="formCTA formCTAsubmit" type="submit">
              {isEditing ? "Save changes" : "Save note"}
            </Button>
            <Button
              className="formCTA formCTAsecondary"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
