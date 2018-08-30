const express=require('express')
const methodOverride=require('method-override')
const app= express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
// app.get('/',(req,res) => {
//     res.send('Hello World!')
// })
app.use(methodOverride('_method'))
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
    res.redirect(`/reviews/${review._id}`);
  }).catch((err) => {
    console.log(err.message);
  })
})

app.get('/reviews/:id',(req,res) => {
    Review.findById(req.params.id).then((review)=>{
        res.render('reviews-show',{review:review})
}).catch((err)=>{
    console.log(err.message);
}).catch(err=>{console.log(err.message)})
});

app.get('/reviews/:id/edit',function(req, res){
    Review.findById(req.params.id, function(err,review){
        res.render('reviews-edit',{review:review})
    })
})

app.put('/reviews/:id',(req,res)=>{
    Review.findByIdAndUpdate(req.params.id,req.body).then(review=>{
        res.redirect(`/reviews/${review._id}`)
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
