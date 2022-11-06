const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}
)

module.exports = mongoose.model('todo', todoSchema);