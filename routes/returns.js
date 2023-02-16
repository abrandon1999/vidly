const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {Rental} = require('../models/rental');

router.use(express.json());
router.post('/', auth, async(req,res) => {
   if(!req.header('x-auth-token')) return res.status(401).send('Unauthorized...');
   if(!req.body.customerId) return res.status(400).send("customerId Not Provided...");
   if(!req.body.movieId) return res.status(400).send("movieId Not Provided...");
//-------------------------------------------------------------------------------
  const rental = await Rental.findOne({
      'customer._id': req.body.customerId,
      'movie._id': req.body.movieId,
  });
  if(!rental) return res.status(404).send('Rental not found...');
  if(rental.dateReturned) return res.status(400).send('Return already processed');
  rental.dateReturned = new Date();
  rental.save();
  return res.status(200).send();
 // return res.status(401)
});

module.exports = router;