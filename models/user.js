const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');//<<--------------
const jwt = require('jsonwebtoken');//<<------------

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    email: {
        type:String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true,
    },
    password: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id},config.get('jwtPrivateKey'));
    return token
}

const User = mongoose.model('User', userSchema);

function validateUser (user) {
    const schema = Joi.object({name: Joi.string().min(3).max(50).required(),
                               email: Joi.string().min(5).max(255).required().email(),
                               password: Joi.string().min(5).max(255).required()});
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;