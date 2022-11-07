import { useEffect, useState, useRef } from 'react';
import React from 'react'

const Todos = () => {

  const host = `http://localhost:8000`;

  const [todos, setTodos] = useState([])

  useEffect(() => {
    // eslint-disable-next-line
    getTodos();
  }, [])
  const [todo, setTodo] = useState({ title: "" });
  const [updatedTodo, setUpdatedTodo] = useState({ updatedtitle: "" });

  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    console.log(todo);
    addTodo(todo);
  }

  const handleSaveChanges = () => {
    refClose.current.click();
  }

  const handleUpdate = (todo) => {
    console.log(todo);
    ref.current.click();
    editTodo(todo);
  }

  const handleOnChange = (e) => {
    setTodo({ title: e.target.value });
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
    console.log(todos);
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

  const editTodo = async (todo, title) => {
    // api call for updating todo
    const response = await fetch(`${host}/api/updatetodo/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
    const json = response.json();

    // let newTodos = JSON.parse(json.stringify(todos))
    for (let index = 0; index < todos.length; index++) {
      const element = todos[index];
      if (element._id === todo._id) {
        todos[index].title = title;
        break;
      }
    }
    setTodos(todos);
  }


  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form>
                <div className="form-group row">
                  <label htmlFor="updatedTitle" className="col-sm-2 col-form-label">Task</label>
                  <div className="col-sm-10 d-flex">
                    <input type="text" className="form-control" id='updatedTitle' name='updatedTitle' value={updatedTodo.title} onChange={handleOnChange} />
                    <button className="btn btn-primary mx-1" onClick={handleClick}>Add</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
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