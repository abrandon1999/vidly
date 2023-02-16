const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const validate = require('../middleware/validate');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const moment = require('moment');
const Joi = require('joi');

router.use(express.json());


router.post('/', [auth,validate(validateReturn)], async(req,res) => {
//----------------------------------------------------------------------
//-------------------------------------------------------------------------------
  const rental = await Rental.findOne({
      'customer._id': req.body.customerId,
      'movie._id': req.body.movieId,
  });
  if(!rental) return res.status(404).send('Rental not found...');
  if(rental.dateReturned) return res.status(400).send('Return already processed');

  rental.dateReturned = new Date();
  const rentalDays = moment().diff(rental.dateOut,'days');
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  rental.save();

  await Movie.update({_id: rental.movie._id},{
    $inc: {numberInStock: 1}
  })

  return res.status(200).send(rental);
 // return res.status(401)
});
function validateReturn (req) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });
    return schema.validate(req);
 }




module.exports = router;