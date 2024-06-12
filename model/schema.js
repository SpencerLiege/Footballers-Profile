const mongoose = require('mongoose')
const Schema = mongoose.Schema


const players = new Schema({
    name: String,
    number: Number,
    country:String,
    position: String,
    photo: String,
    tropies: Number
})

module.exports = mongoose.model('Players', players)