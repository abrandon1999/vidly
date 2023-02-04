const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('Hello Express World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
