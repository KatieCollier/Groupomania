const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
      
    // Create an Comment
    const comment = {
      articleId: req.body.articleId,
      userId: req.body.userId,
      content: req.body.content
    };
  
    // Save Comment in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred during signup."
        });
      });
  };

// Retrieve all comments from the database.
exports.findAll = (req, res) => {
  
    Comment.findAll({include: ["user"]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user info."
        });
      });
  };

// Find comment by articleId.
exports.findByArticleId = (req, res) => { 
  const articleId = req.params.id
  
  Comment.findAll(
    {where: {articleId: articleId}, include: ["user", "article"]}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user info."
      });
    });
};