const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
require('./startup/routes')(app);
//----------------------------------------------------------------------
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined...');
    process.exit(1)
}
//---------------------------------------------------------------
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
