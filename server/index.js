const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

// available routes
app.use('/api/addtodo', require('./routes/addtodo.js'));
app.use('/api/fetchalltodos', require('./routes/fetchTodos'));
app.use('/api/updatetodo', require('./routes/updateTodo'));
app.use('/api/deletetodo', require('./routes/deleteTodo'));


app.listen(port, () => console.log(`Server Up and Running on ${port}`));