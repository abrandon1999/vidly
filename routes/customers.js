const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
//---------------------------------------------------------
//Middleware
router.use(express.json());
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
//POST Request for API Customers
router.post('/', async(req,res) => {
   const {error} = validateCustomer(req.body);
   if(error) return res.status(400).send(error.details[0].message)
   let customer =  new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    customer = await customer.save();
    res.send(customer)
});
//---------------------------------------------------------------
function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string()
                 .min(2)
                 .max(255)
                 .required(),
        phone: Joi.string()
                  .min(5)
                  .max(50)
                  .required(),
        isGold: Joi.boolean 
    });
    return schema.validate(customer)
}
module.exports = router;