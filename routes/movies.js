const {Movie, validate} = require('../models/movie'); 
const auth = require('../middleware/auth');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
//Middleware
router.use(express.json());
//----------------------------------------------------------
//GET Request for API Movies
router.get('/', asyncMiddleware(async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
  }));

  router.get('/:id', asyncMiddleware(async(req, res) => {
    const movie = await Movie.findById(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  }));
//----------------------------------------------------------
//POST Request for API Movies
router.post('/', auth, asyncMiddleware(async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    let movie = new Movie({ 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    
    res.send(movie);
  }));
//---------------------------------------------------------
//PUT Request for API Movies
router.put('/:id', auth, asyncMiddleware(async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    const movie = await Movie.findByIdAndUpdate(req.params.id,
      { 
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      }, { new: true });
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    
    res.send(movie);
  }));
//---------------------------------------------------------------
//DELETE Request for API Movies
router.delete('/:id', auth, asyncMiddleware(async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  }));
//--------------------------------------------------------
module.exports = router;
//---------------------------------------------------------
