require('dotenv-flow').config()
const express = require('express')
const app = new express()
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 5000
const connectToDatabase = require('./db')
const Todo = require('./Todo')
let bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

console.log(process.env.DB)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

app.get('/', async (req, res) => {
    await connectToDatabase()
    const todos = await Todo.find()
    res.send({ v: 1, todos })
})

http.createServer(app).listen(process.env.PORT || 8000)
