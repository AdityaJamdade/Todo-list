import React from 'react'

const Todo = ({ todo, todos, setTodos }) => {

    const deleteTodo = (todo)=> {
        console.log("deleting", todo);
        const newTodos = todos.filter((id)=>{ return todo._id !== id});
        console.log(todos);
        setTodos(newTodos);
    }

    return (
        <div className="col-md-4 my-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title ">{todo.title}</h5>
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteTodo(todo)}}></i>
                <i className="fa-solid fa-edit mx-2"></i>
                </div>
            </div>
        </div>

    )
}

export default Todo