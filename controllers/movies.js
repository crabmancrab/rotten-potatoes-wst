const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('4a6310ad1d9a277861f551879528f9f6')
const Review = require('../models/reviews')
const Comment = require('../models/comments')

 module.exports = function movieRoutes(app){
//app.get('/movies/:id',(req,res)=>{
//     moviedb.movieInfo({id:req.params.id }).then((response) => {
//         res.render('movies-show',{movie: response})
//         console.log(response)
//     }).catch(console.error)
// })


app.delete('/movies/:movieId/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect(`/movies/${review.movieId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})


app.get('/movies/:id', (req, res) => {

  moviedb.movieInfo({ id: req.params.id }).then((movie) => {
    Review.find({ movieId: req.params.id }).then((reviews) => {
        console.log(reviews)
      res.render('movies-show', { movie: movie, reviews: reviews });
    })
  }).catch(console.error)
})

app.get('/movies/:movieId/reviews/new', (req, res) => {
// console.log(req.params)
res.render('movies-new', { movieId: req.params.movieId })
})

app.post('/movies/:movieId/reviews', (req, res) => {
    console.log(req)
  Review.create(req.body).then((review) => {
    // console.log(req.params);
    res.redirect(`/movies/${review.movieId}`);
  }).catch((err) => {
    // console.log(err.message);
  })
})

// app.get('/movies/:id', (req, res) => {
//   moviedb.movieInfo({ id: req.params.id }).then((movie) => {
//     if (movie.video) {
//       moviedb.movieVideos({ id: req.params.id }).then((videos) => {
//         movie.trailer_youtube_id = videos.results[0].key
//         renderTemplate(movie)
//       })
//     } else {
//       renderTemplate(movie)
//     }
//
//     function renderTemplate(movie)  {
//       res.render('movies-show', { movie: movie });
//     }
//
//   }).catch(console.error)
// })
app.get('/movies/:movieId/reviews/:id/edit',function(req, res){
    Review.findById(req.params.id, function(err,review){
        res.render('reviews-edit',{review:review})
    })
})

app.get('/movies/:movieId/reviews/:id', (req, res) => {
// find review
Review.findById(req.params.id).then(review => {
  // fetch its comments
  Comment.find({ reviewId: req.params.id }).then(comments => {
    // respond with the template with both values
    res.render('reviews-show', { review: review, comments: comments })
  })
}).catch((err) => {
  // catch errors
  console.log(err.message)
});
});

app.get('/', (req, res) => {




 let genreList = moviedb.genreMovieList().then(response => {

      return response.genres



  }).catch(console.error)



genreList.then(


function(data){

    moviedb.miscNowPlayingMovies().then(response => {



    response.results.forEach(function(result){
        result.genre_ids.forEach(function(genreId,index,arr){
            data.forEach(function(listObj){
                if(listObj.id === genreId){
                    arr[index] = listObj.name
                }
            })



        })

    })

    response.results.forEach(function(result){
        result.genre_ids.forEach(function(genreId){
            // console.log(genreId)
        })
    })

    // console.log(response.results)



        res.render('movies-index', {movies: response.results});


      }).catch(console.error)




}

)

})




}
