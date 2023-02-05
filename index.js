const express = require('express');
const Joi = require('joi');
const app = express();
//-----------------------------------------------------------------------
//MiddleWare
app.use(express.json());
//------------------------------------------------------------------------
//Fake Database
const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id: 3, name: "Romance"}
];
//-------------------------------------------------------------------------
//GET Request for API Genres
app.get('/api/genres', (req,res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req,res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre) res.status(404).send("Genre with Given ID was not Found");
    res.send(genre)
});
//-------------------------------------------------------------------------
//POST Request for API Genres
app.post('/api/genres',(req,res) => {
    const myResult = validateGenre(req.body);
    
    if(myResult.error){
        return res.status(400).send(myResult.error.details[0].message)
    }
//-------------------------------------------------------------------------
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});
//---------------------------------------------------------------------------
//GET Request for API HOME
app.get('/', (req,res) => {
    res.send('Hello Express World!!!');
});
//--------------------------------------------------------------------------
 function validateGenre (genre) {
    const schema = Joi.object({name: Joi.string().min(2).max(50).required()});
    return schema.validate(genre);
 }
//--------------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
