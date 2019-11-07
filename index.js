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
	next()
})

app.get('/todos', async (req, res) => {
    await connectToDatabase()
    Todo.getTodos((err, todos) => {
        if (err) throw err
        res.send({ todos })
    })
})

http.createServer(app).listen(process.env.PORT || 8000)
