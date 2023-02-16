const express = require('express');
const router = express.Router();
const {Rental} = require('../models/rental');

router.use(express.json());
router.post('/', async(req,res) => {
   if(!req.header('x-auth-token')) return res.status(401).send('Unauthorized')
   if(!req.body.customerId) return res.status(400).send("customerId Not Provided")
   if(!req.body.movieId) return res.status(400).send("movieId Not Provided")
  const rental = await Rental.findOne({
      'customer._id': req.body.customerId,
      'movie._id': req.body.movieId,
  });
   // console.log("myCheck", req.header('x-auth-token'))
  if(!rental) return res.status(404).send('Rental not found.');
   // res.status(401).send('Unauthorized');
});

module.exports = router;