//const winston = require('winston');
const mongoose = require('mongoose');
module.exports = function () {
    mongoose.set('strictQuery',false);
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => console.log("Successfully, Connected to MongoDB..."))
       // .catch(err => console.log("Sorry, Could not connect to MongoDB...",err))
}