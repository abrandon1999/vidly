const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
const router = express.Router();
const {Genre, validate: validateGenre} = require('../models/genre');
//MiddleWare
router.use(express.json());
const NoGenre = 'Genre with the Given ID was not Found';
//-------------------------------------------------------------------------
//GET Request for API Genres

router.get('/', asyncMiddleware(async(req,res,next) => { 
        const genres = await Genre.find().sort('name');
        res.send(genres); 
}));
router.get('/:id', async(req,res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) res.status(404).send(NoGenre)
    res.send(genre);
});
//-------------------------------------------------------------------------
//POST Request for API Genres
router.post('/',auth,async(req,res) => {
    const myResult = validateGenre(req.body);
    if(myResult.error){
        return res.status(400).send(myResult.error.details[0].message);
    }
//-------------------------------------------------------------------------
    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//PUT Request for API Genres
    router.put('/:id',auth, async(req, res) => {
        const {error} = validateGenre(req.body);
        if(error) return res.status(400).send(error.details[0].message);
       const genre =  await Genre.findByIdAndUpdate(req.params.id,
                               {name: req.body.name},
                               {new: true});
        if(!genre) res.status(404).send(NoGenre);
        res.send(genre);
    });
//----------------------------------------------------------------------------
//DELETE Request for API Genres
    router.delete('/:id',[auth,admin], async(req,res) => {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if(!genre) res.status(404).send("Genre with Given ID was not found")
        res.send(genre);
    });
//----------------------------------------------------------------------------
 module.exports = router;