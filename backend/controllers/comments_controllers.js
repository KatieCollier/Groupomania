const db = require("../models");
const Comment = db.comments;

// Create and Save a new Comment
exports.create = (req, res) => {
    // Create a Comment
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
            err.message || "Une erreur est survenue lors de la création de votre commentaire."
        });
      });
  };

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
  const page = req.query.page

    Comment.findAndCountAll({
      limit: 5, //number of comments per page
      offset: 5*page, //number of comments to skip before start showing comments
      order: [["updatedAt", "DESC"]], // oder all comments from the most recently updated to the least 
      include: ["user", "article"]
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la recherche des commentaires."
        });
      });
  };

// Find Comment by ArticleId.
exports.findByArticleId = (req, res) => { 
  const articleId = req.params.id
  Comment.findAll( //find comments that fulfill the condition of articleId = articleId
    {where: {articleId: articleId}, include: ["user", "article", "commentLikes"]}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Les commentaires de cet article ne peuvent être trouvés."
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
        message: "Ce commentaire ne peut être trouvé."
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
          message: "Commentaire modifié."
        });
      } else {
        res.send({
          message: "Erreur lors de la mise à jour de ce commentaire"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de mettre à jour ce commentaire"
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
          message: "Commentaire effacé."
        });
      } else {
        res.send({
          message: "Erreur lors de la supression de ce commentaire."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer ce commentaire."
      });
    });
};