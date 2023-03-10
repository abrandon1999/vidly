const Joi = require('joi');
const mongoose = require('mongoose');
//----------------------------------------------------
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
});
//-------------------------------------------------------
const Genre = new mongoose.model('Genre', genreSchema);
//--------------------------------------------------------------------------
function validateGenre (genre) {
    const schema = Joi.object({name: Joi.string().min(2).max(50).required()});
    return schema.validate(genre);
 }
 //----------------------------------------------------------------------------
 module.exports.validate = validateGenre;
 module.exports.Genre = Genre;
 module.exports.genreSchema = genreSchema;