const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});

module.exports = Review
