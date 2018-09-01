const mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient
mongoose.connect('process.env.MONGODB_URI' || 'mongodb://localhost:27017/rotten-potatoes');
var url='process.env.MONGODB_URI' || 'mongodb://localhost:27017/rotten-potatoes'
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});
module.exports = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});
