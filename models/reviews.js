const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');


module.exports = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});
