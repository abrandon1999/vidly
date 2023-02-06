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

//Customer.js Model
const Customer = mongoose.model('Customer', customerSchema);
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
//------------------------------------------------------------
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;

