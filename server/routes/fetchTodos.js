const express = require('express');
const router = express.Router();

const todos = require('../models/Todo');

// endpoint to get all the todos
router.get('/', async (req, res) => {
    
    const Todos = await todos.find();
    res.json(Todos);
});


module.exports = router;