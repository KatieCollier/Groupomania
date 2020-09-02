const db = require("../models");
const CommentLike = db.commentLikes;
const Op = db.Sequelize.Op;

// Create and Save a new CommentLike
exports.create = (req, res) => {
    // Create a Like
    const commentlike = {
      commentId: req.body.commentId,
      userId: req.body.userId
    };
    // Save Like in the database
    CommentLike.create(commentlike)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur"
        });
      });
  };

//Find CommentLikes by comment id
exports.findByCommentId = (req, res) => { 
  const commentId = req.params.id
  CommentLike.findAll(
    {where: {commentId: commentId}}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Impossible de trouver les likes pour ce commentaire"
      });
    });
};

// Retrieve all Commentslikes from the database.
exports.findAll = (req, res) => {
  
    CommentLike.findAll()
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