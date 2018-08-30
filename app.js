const express=require('express')
const app= express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
// app.get('/',(req,res) => {
//     res.send('Hello World!')
// })
//not sure if the var promise is necessary
mongoose.connect('mongodb://localhost/rotten-potatoes');
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});
app.use(bodyParser.urlencoded({ extended: true }));
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
    .then((reviews) => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch((err) => {
      console.log(err.message);
    })
})

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
// app.post('/reviews', (req, res) => {
//   console.log(req.body);
//   //put a dub slash here if need be
//   //res.render('reviews-new', {});
// })

// INDEX
// app.get('/reviews', (req, res) => {
//   res.render('reviews-index', { reviews: reviews });
// })
