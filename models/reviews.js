const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/rotten-potatoes');
mongoose.connect('mongodb://127.0.0.1:27017' || 'mongodb://localhost/rotten-potatoes');
module.exports = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});
