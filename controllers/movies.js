const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('4a6310ad1d9a277861f551879528f9f6')

 module.exports = function movieRoutes(app){
//app.get('/movies/:id',(req,res)=>{
//     moviedb.movieInfo({id:req.params.id }).then((response) => {
//         res.render('movies-show',{movie: response})
//         console.log(response)
//     }).catch(console.error)
// })

app.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({ id: req.params.id }).then((movie) => {
    if (movie.video) {
      moviedb.movieVideos({ id: req.params.id }).then((videos) => {
        movie.trailer_youtube_id = videos.results[0].key
        renderTemplate(movie)
      })
    } else {
      renderTemplate(movie)
    }

    function renderTemplate(movie)  {
      res.render('movies-show', { movie: movie });
    }

  }).catch(console.error)
})

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
