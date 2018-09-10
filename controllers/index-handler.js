var bigMovies=require(./movies.js)

var lilMovies=bigMovies.Movies

var genres=bigMovies.genres

res.render('movies-index',{movies: lilMovies} )
