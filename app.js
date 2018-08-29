const express=require('express')
const app= express()
const mongoose = require('mongoose')
// app.get('/',(req,res) => {
//     res.send('Hello World!')
// })
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });
const Review = mongoose.model('Review', {
  title: String
});
app.listen(3000,() => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Hello World!' });
// })


// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review" },
//   { title: "Memaw reviews" }
// ]

app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
    })
})

// INDEX
// app.get('/reviews', (req, res) => {
//   res.render('reviews-index', { reviews: reviews });
// })
