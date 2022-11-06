const express = require('express');
const router = express.Router();
const todos = require('../models/Todo');

// endpoint to update a todo
router.put('/:id', async (req, res) => {
    try {
        const { title } = req.body;

        // create a new todo object
        const newTodo = {};
        if (title) newTodo.title = title;

        let todo = await todos.findByIdAndUpdate(req.params.id, { $set: newTodo }, { new: true });
        res.json(todo);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

})

module.exports = router;