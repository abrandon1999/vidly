const express = require('express');
const app = express();
const config = require('config');
require('./startup/logging'); //logging should come first
require('./startup/routes')(app);
require('./startup/db')();
//----------------------------------------------------------------------
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined...');
    process.exit(1)
}
//-----------------------------------------------------------------------
//GET Request for API HOME
app.get('/', (req,res) => {
    res.send('Hello Express World!!!');
});
//--------------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
