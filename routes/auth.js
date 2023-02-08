const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const mongoose = require('mongoose');
//const {User, validate} = require("../models/user");<<-------
const {User} = require("../models/user");//<<------------
const express = require('express');
const { valid } = require('joi');
const router = express.Router();
router.use(express.json());
const Joi = require("joi");

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});  
    if(!user) return res.status(400).send("Invalid email or Password");

   const validPassword = await bcrypt.compare(req.body.password,user.password);
   if (!validPassword) return res.status(400).send("Invalid email or Password");

   const token = jwt.sign({_id: user._id},'jwt-privatekey' );
   res.send(token)

});
function validate (req) {//--------------------------
    const schema = Joi.object({
                               email: Joi.string().min(5).max(255).required().email(),
                               password: Joi.string().min(5).max(255).required()});
    return schema.validate(req);
}

module.exports = router;