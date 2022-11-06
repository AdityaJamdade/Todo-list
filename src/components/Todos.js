import { useEffect, useState } from 'react';
import React from 'react'
import Todo from './Todo'

const Todos = () => {

  const host = `http://localhost:8000`;

  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos();
  }, [])
  const [todo, setTodo] = useState({ title: "" });

  const handleClick = (e) => {
    e.preventDefault();
    console.log(todo);
    addTodo(todo);
  }

  const handleSubmit = () => {

  }

  const handleOnChange = (e) => {
    setTodo({ title: e.target.value });
  }

  const getTodos = async () => {
    // api call for fetching todos
    const response = await fetch(`${host}/api/fetchalltodos` , {
      method:'GET',
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
    const response = await fetch(`${host}/api/addtodo` , {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title:todo.title})
    })

    const newTodo = await response.json();
    setTodos(todos.concat(newTodo));
    console.log(todos);
  }

  const deleteTodo = async (todo) => {
    // api call for deleting todo
    const response = await fetch(`${host}/api/deletetodo/${todo._id}` , {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const json = response.json();
    console.log(json);

    console.log("deleting", todo);
    const toDelete = todo;
    setTodos(todos.filter((todo) => ( todo._id !== toDelete._id )));
  }

  const editNote = async (todo, title) => {
    // api call for updating todo
    const response = await fetch(`${host}/api/updatetodo/${todo._id}` , {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title})
    })
    const json = response.json();

    for (let index = 0; index < todos.length; index++) {
      const element = todos[index];
      if(element._id === todo._id){
        element.title = title;
      }
    }
  }

  return (
    <>
      <div className="row m-3">
        <h2>Yout Todos</h2>
        <div className="row">
          {todos.map((todo) => {
            return (<div key={todo._id} className="col-md-4 my-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title ">{todo.title}</h5>
                  <i className="fa-solid fa-trash mx-2" onClick={() => { deleteTodo(todo) }}></i>
                  <i className="fa-solid fa-edit mx-2"></i>
                </div>
              </div>
            </div>)
          })}
        </div>
      </div>
      <div className="col-md-3 m-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title my-2">Create new task here!</h5>
            <form action="" onSubmit={handleSubmit}>
              <input type="text" placeholder='Add Todo' className='d-block my-2 mt-3 form-control' name="title" id="title" onChange={handleOnChange} value={todo.title} />
              <button type='submit' className='btn btn-primary' onClick={handleClick}>Add</button>
            </form>

          </div>
        </div>
      </div>
    </>

  )
}

export default Todos