require('dotenv-flow').config()
const express = require('express')
const app = new express()
const http = require('http')
const connectToDatabase = require('./db')
const Todo = require('./Models/Todo')
let bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

console.log(process.env.DB)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
	next()
})

app.get('/api/todos', async (req, res) => {
    await connectToDatabase()
    Todo.getTodos((err, todos) => {
        if (err) throw err
        res.send(todos)
    })
})

app.post('/api/todos', async (req, res) => {
    await connectToDatabase()
    let todo = req.body
    Todo.createTodo(todo, (err, todo) => {
        if (err) throw err
        res.send(todo)
    })
})

app.put('/api/todos/:_id', async (req, res) => {
    await connectToDatabase()
    let id = req.params._id
    let todo = req.body
    // console.log(todo, id)
    Todo.updateTodo(id, todo, {}, (err, update) => {
        if (err) throw err
        res.send(update)
    })
})

app.delete('/api/todos/:_id', async (req, res) => {
    await connectToDatabase()
    let id = req.params._id
    Todo.deleteTodo(id, (err, todo) => {
        if (err) throw err
        res.send(todo)
    })
})

app.post('/api/todos/check/:_id/', async (req, res) => {
    await connectToDatabase()
    let id = req.params._id
    Todo.checkTodo(id, (err, todo) => {
        if (err) throw err
        res.send(todo)
    })
})

http.createServer(app).listen(process.env.PORT || 8000)
