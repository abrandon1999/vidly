const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
//---------------------------------------------------------
//Customers Schema
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 255,
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type:"String",
        require: true,
        minlength: 2, 
        maxlength: 50,
    },
});
const noCustomer = "Customer with the Given ID was not found";
//--------------------------------------------------------------
//Customer.js Model
const Customer = mongoose.model('Customer', customerSchema);
//---------------------------------------------------------------
//GET Request for API Customers
router.get('/', async(req,res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});
router.get('/:id', async(req,res) => {
   const customer = await Customer.findById(req.params.id);
   if(!customer) res.status(404).send(noCustomer);
   res.send(customer);
});
//---------------------------------------------------------------
module.exports = router;