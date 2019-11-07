const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    text: String,
    done: Boolean,
    edited: Date,
    id: Number
})
module.exports = mongoose.model('Note', TodoSchema)