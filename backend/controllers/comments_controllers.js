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
    {where: {articleId: articleId}, include: ["user", "article", "commentLikes"]}
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

// Find a single Comment by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Ne trouve pas le commentaire concerné"
      });
    });
};

//update Comment by id
exports.update = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Commentaire modifié avec succès."
        });
      } else {
        res.send({
          message: "Echec de la mise à jour du commentaire"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Echec de la mise à jour du commentaire"
      });
    });
};

//Delete a Comment with a specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Commentaire effacé"
        });
      } else {
        res.send({
          message: "Echec de la supression du commentaire"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Echec de la supression du commentaire"
      });
    });
};