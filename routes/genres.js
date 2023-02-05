const express = require('express');
const router = express.Router();
const Joi = require('joi');



//MiddleWare
router.use(express.json());
//------------------------------------------------------------------------
//Fake Database
const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id: 3, name: "Romance"}
];
const NoGenre = 'Genre with the Given ID was not Found';
//-------------------------------------------------------------------------
//GET Request for API Genres
router.get('/', (req,res) => {
    res.send(genres);
});

router.get('/:id', (req,res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre) res.status(404).send(NoGenre);
    res.send(genre)
});
//-------------------------------------------------------------------------
//POST Request for API Genres
router.post('/',(req,res) => {
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
//---------------------------------------------------------------------------
//PUT Request for API Genres
    router.put('/:id', (req, res) => {
        const genre = genres.find(g => g.id === parseInt(req.params.id));
        if(!genre) res.status(404).send(NoGenre)

        const {error} = validateGenre(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        genre.name = req.body.name;
        res.send(genre)
    });
//----------------------------------------------------------------------------
//DELETE Request for API Genres
    router.delete('/:id', (req,res) => {
        const genre = genres.find(g => g.id === parseInt(req.params.id));
        if(!genre) res.status(404).send(NoGenre);

        const index = genres.indexOf(genre);
        genres.splice(index,1);
        res.send(genre);
    });
//----------------------------------------------------------------------------
//--------------------------------------------------------------------------
function validateGenre (genre) {
    const schema = Joi.object({name: Joi.string().min(2).max(50).required()});
    return schema.validate(genre);
 }
 //----------------------------------------------------------------------------
 module.exports = router;