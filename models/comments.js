// const mongoose = require('mongoose')
//
// const Schema = mongoose.Schema
//
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
//
// module.exports = mongoose.model('comments', {
//   title: String,
//   content: String,
//   reviewId: { type: Schema.Types.ObjectId, ref: 'reviews' }
// });

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = Comment
