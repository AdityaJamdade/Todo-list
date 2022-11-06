const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')

const todos = require('../models/Todo');

router.post('/', [
    body('title', 'Title must be more than 5 characters long!').isLength({ min: 3 }),
], (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        todos.create({
            title: req.body.title,
        }).then((todo) => res.json(todo));
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }



});

router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router;