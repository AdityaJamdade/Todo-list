const express = require('express');
const router = express.Router();
const todos = require('../models/Todo');

// endpoint to delete a todo
router.delete('/:id', async (req, res) => {
    const {title} = req.body;

    // create a new todo object
    const newTodo = {};
    if(title) newTodo.title = title;

    let todo = await todos.findByIdAndUpdate(req.params.id, {$set: newTodo}, {new: true});
    res.json(todo);
})

module.exports = router;