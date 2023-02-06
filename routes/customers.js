const express = require('express');
const router = express.Router();
const {Customer,validate: validateCustomer} = require("../models/customer");
//---------------------------------------------------------
//Middleware
router.use(express.json());
//--------------------------------------------------------------
const noCustomer = "Customer with the Given ID was not found";
//--------------------------------------------------------------
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
//PUT Request for API Customer
router.put('/:id', async(req, res) => {
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id,
                                    {
                                        name: req.body.name,
                                        phone:req.body.phone,
                                        isGold: req.body.isGold
                                   },{new: true});
    if(!customer) res.status(404).send(noCustomer);
    res.send(customer)
});
//---------------------------------------------------------------
//DELETE Request for API Customer
    router.delete('/:id', async(req, res) => {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if(!customer)res.status(404).send(noCustomer);
        res.send(customer)
    });
//---------------------------------------------------------------
module.exports = router;