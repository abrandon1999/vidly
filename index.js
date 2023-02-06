const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const mongoose = require('mongoose');
//----------------------------------------------------------------------
//Middleware
app.use('/api/genres', genres);
app.use('/api/customers',customers);
//-----------------------------------------------------------------------
mongoose.set('strictQuery',false);
mongoose.connect('mongodb://localhost/vidly')
        .then(() => console.log("Successfully, Connected to MongoDB..."))
        .catch(err => console.log("Sorry, Could not connect to MongoDB...",err))
//-----------------------------------------------------------------------
//GET Request for API HOME
app.get('/', (req,res) => {
    res.send('Hello Express World!!!');
});
//--------------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
