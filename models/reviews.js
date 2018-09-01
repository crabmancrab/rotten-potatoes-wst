const mongoose = require('mongoose')

mongoose.connect('process.env.MONGODB_URI' || 'mongodb://localhost:27017/data/db');


module.exports = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});
