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

// Create Todo
module.exports.createTodo = function (todo, callback) {
    Todo.create(todo, callback)
}

// Update Todo
module.exports.updateTodo = function (id, todo, options, callback) {
    let query = {_id: id}
    let {text, done} = todo
    let update = {
        text,
        done,
        edited: Date.now()
    }
    Todo.findOneAndUpdate(query, update, {useFindAndModify: false, new: true}, callback)
}

// Delete Todo
module.exports.deleteTodo = function (id, callback) {
    let query = {_id: id}
    Todo.deleteOne(query, callback)
}

// Check Todo
module.exports.checkTodo = function (id, callback) {
    let query = {_id: id}
    console.log('idd', id)
    Todo.findById(id, ((err, todo) => {
        if (err) throw err
        todo.done = true
        console.log('to check', todo)
        Todo.updateOne(query, todo, callback)
    }))
}