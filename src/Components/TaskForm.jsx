import React from 'react'
import {  useState } from 'react';
import { nanoid } from 'nanoid';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function TaskForm({addPost}) {
    const [text, setText] = useState('')
    const [type, setType] = useState('Urgent')
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handlePostText = (e) => {
        setText(e.target.value)
    }
    const handleSelect = (e) => {
        setType(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: nanoid(),
            text: text,
            createDate: new Date().toLocaleDateString(),
            priority: type,
            status: 'toDo'
        }
        //console.log(newPost)
        addPost(newPost);
        setText("")
        setType('Urgent')
    }

  return (
    <>
            <Button className="mainCTA"  onClick={handleShow}>Add task</Button>
            <Modal show={show} onHide={handleClose}>
                    <form onSubmit={handleSubmit} className='form'>
                        <div className='sectionForm'>
                        <Form.Label className="label" htmlFor="exampleColorInput">To Do</Form.Label>
                        <Form.Control onChange={handlePostText} className="textArea" as="textarea" rows={3} name="text" value={text} />
                        </div>
                        <div className='sectionForm'>
                        <Form.Label className="label label2" htmlFor="exampleColorInput">Type</Form.Label>
                        <Form.Select onChange={handleSelect}>
                            <option value="Urgent">Urgent</option>
                            <option value="NotUrgent">Not Urgent</option>
                            <option value="Bonus">Bonus</option>
                        </Form.Select>
                        </div>
                        <Button className="formCTA formCTAsubmit" type='submit' onClick={handleClose}>Save note</Button>
                        <Button className="formCTA formCTAsecondary" variant="secondary" onClick={handleClose}> Close </Button>
                    </form>
            </Modal>

            
    </>
  )
}
