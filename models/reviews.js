const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/rotten-potatoes');
mongoose.connect('mongodb://heroku_6hnbdz0t:unc9i8dqjh9dfrfjbq79tehor8@ds139632.mlab.com:39632/heroku_6hnbdz0t' || 'mongodb://localhost/rotten-potatoes');
module.exports = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});
