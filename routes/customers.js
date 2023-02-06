const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

//---------------------------------------------------------
//Customers Schema
const Customer = new mongoose.Schema({
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
//---------------------------------------------