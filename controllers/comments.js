const Comment = require('../models/comments')

module.exports = function newRoutes(app) {

    app.post('/reviews/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
        res.redirect(`/reviews/${comment.reviewId}`)
      }).catch((err) => {
        console.log(err.message)
      })
    })

    
}
