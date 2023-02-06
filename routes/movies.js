const {Movie, validate} = require('../models/movies'); 
const {Genre} = require('../models/genres');
const express = require('express');
const router = express.Router();
//----------------------------------------------------------
//GET Request for API Movies
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
  });
//----------------------------------------------------------
module.exports = router;
//---------------------------------------------------------
