const express = require('express');
const app = express();

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id: 3, name: "Romance"}
];
//-------------------------------------------------------------------------
app.get('/api/genres', (req,res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req,res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre) res.status(404).send("Genre with Given ID was not Found");
    res.send(genre)
});
//-------------------------------------------------------------------------
app.get('/', (req,res) => {
    res.send('Hello Express World!!!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
