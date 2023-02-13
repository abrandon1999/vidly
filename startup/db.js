//const winston = require('winston');
const config = require('config');
const mongoose = require('mongoose');
module.exports = function () {
    const db = config.get('db');
    mongoose.set('strictQuery',false);
    mongoose.connect(db)
        .then(() => console.log(`Successfully, Connected to ${db}`))
       // .catch(err => console.log("Sorry, Could not connect to MongoDB...",err))
}