const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    text: String,
    done: Boolean,
    edited: {
        type: Date,
        default: Date.now()
    },
    id: Number
})
let Todo = module.exports = mongoose.model('Todo', TodoSchema)

// Get Todos
module.exports.getTodos = function (callback, limit) {
    Todo.find(callback).limit(limit)
}