import { useEffect, useState, useRef } from 'react';
import React from 'react'

const Todos = () => {

  const host = `http://localhost:8000`;

  const [todos, setTodos] = useState([])

  useEffect(() => {
    // eslint-disable-next-line
    getTodos();
  }, [])

  const [newTitle, setNewTitle] = useState("");
  const [todo, setTodo] = useState({ title: "" });
  const [updatedTodo, setUpdatedTodo] = useState({});

  const refOpen = useRef(0);
  const refClose = useRef(0);
  const refUpdateInput = useRef(0);
  const refInput = useRef(0);
  
  const handleClick = (e) => {
    e.preventDefault();
    console.log(todo);
    addTodo(todo);
    setTodo({title:""})
  }

  const handleSaveChanges = () => {
    refClose.current.click();
  }

  
  const handleOnChange = (e) => {
    setTodo({ title: e.target.value });
  }
  const handleUpdate = (todo) => {
    setUpdatedTodo(todo);
    console.log(todo);
    refOpen.current.click();
    document.getElementById('updatedTitle').focus();
  }
  const handleOnUpdateChange = (e) => {
    setNewTitle(e.target.value);
  }
  const handleSave = () => {
    editTodo(updatedTodo._id, newTitle);
    refClose.current.click();
    setNewTitle("");
  }

  const getTodos = async () => {
    // api call for fetching todos
    const response = await fetch(`${host}/api/fetchalltodos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json();
    console.log(json);
    setTodos(json);
  }

  const addTodo = async (todo) => {
    // api call for adding todo
    const response = await fetch(`${host}/api/addtodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: todo.title })
    })

    const newTodo = await response.json();
    setTodos(todos.concat(newTodo));
  }

  const deleteTodo = async (todo) => {
    // api call for deleting todo
    const response = await fetch(`${host}/api/deletetodo/${todo._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const json = response.json();
    console.log(json);

    console.log("deleting", todo);
    const toDelete = todo;
    setTodos(todos.filter((todo) => (todo._id !== toDelete._id)));
  }

  const editTodo = async (id, title) => {
    // api call for updating todo
    const response = await fetch(`${host}/api/updatetodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
    const json = response.json();

    let newTodos = JSON.parse(JSON.stringify(todos));
    for (let index = 0; index < newTodos.length; index++) {
      const element = newTodos[index];
      if (element._id === id) {
        newTodos[index].title = title;
        break;
      }
    }
    setTodos(newTodos);
  }


  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button ref={refOpen} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{updatedTodo.title}</h5>
            </div>
            <div className="modal-body">
              <b>New title</b> 
              <hr />
              <input autoFocus={true} type="text" className="form-control" id='updatedTitle' name='updatedTitle' value={newTitle} onChange={handleOnUpdateChange} />
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-3">
        <h2>Yout Todos</h2>
        <div className="row w-full">
          {todos && todos.map((todo) => {
            return (<div key={todo._id} className="col-md-3 my-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title ">{todo.title}</h5>
                  <i className="fa-solid fa-trash mx-2" onClick={() => { deleteTodo(todo) }}></i>
                  <i className="fa-solid fa-edit mx-2" onClick={() => { handleUpdate(todo) }}></i>
                </div>
              </div>
            </div>)
          })}
        </div>
        <div className="my-2" style={{ "width": "500px" }}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title ">Add new</h5>
              <form>
                <div className="form-group row">
                  <label htmlFor="title" className="col-sm-2 col-form-label">Task</label>
                  <div className="col-sm-10 d-flex">
                    <input type="text" className="form-control" id='title' name='title' value={todo.title} onChange={handleOnChange} />
                    <button className="btn btn-primary mx-1" onClick={handleClick}>Add</button>
                  </div>
                </div>
                {/* <div className="form-group row">
                <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                </div>
              </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Todos