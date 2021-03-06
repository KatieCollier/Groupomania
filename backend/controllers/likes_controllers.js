const db = require("../models");
const Like = db.likes;

// Create and Save a new Like
exports.create = (req, res) => {
    // Create a Like
    const like = {
      articleId: req.body.articleId,
      userId: req.body.userId
    };
    // Save Like in the database
    Like.create(like)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Impossible de liker cet article."
        });
      });
  };

//Find Likes by ArticleId
exports.findByArticleId = (req, res) => { 
  const articleId = req.params.id
  Like.findAll(
    {where: {articleId: articleId}}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Impossible de trouver les likes pour cet article."
      });
    });
};