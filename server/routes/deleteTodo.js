const express = require('express');
const router = express.Router();
const todos = require('../models/Todo');

// endpoint to delete a todo
router.delete('/:id', async (req, res) => {

    try {
        let todo = await todos.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted" });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

})

module.exports = router;