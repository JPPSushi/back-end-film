//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema 
const movieSchema = new Schema({
    rating : Number, // Decimal128 // String
    name: String,
    director: String,
    time: String,
    DateOfRelease: String
  })
//defining the name of the constructor for our class
const Movie = mongoose.model('Movie', movieSchema);
//export the class, also called a model or a document, to use in different files
module.exports = Movie
