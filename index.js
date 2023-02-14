const express = require('express');
const app = express();

require('./startup/logging')(); //logging should come first
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
//----------------------------------------------------------------------
//GET Request for API HOME
app.get('/', (req,res) => {
    res.send('Hello Express World!!!');
});
//--------------------------------------------------------------------------
process.env.PORT = 5000;
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on Port ${port}...`));
server.close(); //For Test purpose only
module.exports = server;
