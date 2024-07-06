import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { add_task, remove_task, toggleTaskCompletion, edit_task } from './Redux/todoSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [task, setTask] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const dispatch = useDispatch();
  const toDo = useSelector(state => state.todoList?.tasks);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditedTask("");
    setEditIndex(null);
  };
  const handleShow = (index) => {
    setEditedTask(toDo[index].name);
    setEditIndex(index);
    setShow(true);
  };

  useEffect(() => {
    
  }, [toDo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(task);
    try {
      if (task.trim()) {
        dispatch(add_task({ name: task }));
        setTask("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (index) => {
    dispatch(toggleTaskCompletion({ index, isCompleted: !toDo[index].isCompleted }));
  };

  const handleDelete = (index) => {
    dispatch(remove_task({ index }));
  };

  const handleEditSubmit = () => {
    if (editedTask.trim()) {
      dispatch(edit_task({ index: editIndex, name: editedTask }));
      handleClose();
    }
  };

  return (
    <div>
      <h1 className='text-center text-light mt-3'>To-Do App</h1>

      <form onSubmit={handleSubmit}>
        <div className='row g-0'>
          <div className='col-md-7 col-sm-4 d-flex justify-content-end mt-5 form-detail'>
            <input
              type='text'
              placeholder='Enter Task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className='bg-light rounded input-task ps-3'
              required
            />
          </div>
          <div className='col-md-5 mt-5 button-div'>
            <button type='submit' className='btn ms-2 add-btn'>Add Task</button>
          </div>
        </div>
      </form>

      <div className='mt-5 m-auto col-lg-2 col-md-3 col-sm-12 d-flex flex-column justify-content-center'>
        {toDo?.map((task, index) => (
          <div key={index} className='row justify-content-center align-items-center mb-2'>
            <div className='col col-md-10 col-sm-4 d-flex align-items-center view-task'>
              <input
                type='checkbox'
                className='me-2'
                style={{ cursor: "pointer" }}
                checked={task.isCompleted}
                onChange={() => handleCheckboxChange(index)}
              />
              <h3 className={`text-light view-task-text ${task.isCompleted ? 'completed' : ''}`}>{task.name}</h3>
            </div>
            <div className='col-md-1 d-flex view-task-btn'>
              <button className='btn btn-outline-light del-btn' onClick={() => handleShow(index)}><i className="fa-solid fa-pencil"></i></button>
              <button className='btn btn-danger ms-2 del-btn' onClick={() => handleDelete(index)}><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type='text'
            className='form-control'
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
