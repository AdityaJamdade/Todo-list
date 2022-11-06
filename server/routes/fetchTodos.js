const express = require('express');
const router = express.Router();

const todos = require('../models/Todo');

// endpoint to get all the todos
router.get('/', async (req, res) => {

    try {
        const todo = await todos.find();
        res.json(todo);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;