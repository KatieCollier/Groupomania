const fs = require("fs");
const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "L'article doit avoir un titre !"
      });
      return;
    }
    // Create an Article
    const article = req.file ?
      {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        imageUrl:  `${req.protocol}://${req.get('host')}/${req.file.filename}`
      } : {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      }

    // Save Article in the database
    Article.create(article)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur lors de la creation de l'article."
        });
      });
  };

// Retrieve all Articles from the database by page and keyword if available.
exports.findAll = (req, res) => {
  const keyword = req.query.keyword;
  const condition = keyword ? {title: {[Op.like]: `%${keyword}%`} }: null
  const page = req.query.page;
  
    Article.findAndCountAll({
      limit: 5,
      offset: 5*page,
      order: [["updatedAt", "DESC"]], 
      include: ["user", "comments"],
      where: condition
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la recherche des articles."
        });
      });
  };

// Find a single Article with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Article.findByPk(id, {include: ["user", "comments"]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la recherche de cet article."
      });
    });
};

// Update an Article identified by id
exports.update = (req, res) => {  
  const id = req.params.id;

  const article = req.file ?
   {
    title: req.body.title,
    content: req.body.content,
    imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`
  } : {
    title: req.body.title,
    content: req.body.content
  }

  Article.update(article, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "L'article a été mis à jour."
        });
      } else {
        res.send({
          message: "Erreur lors de la mise à jour de cet article"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de mettre à jour cet article"
      });
    });
};

//Delete an article with a specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then(article => {
      const filename = article.imageUrl ? {
        name: article.imageUrl.split("3000/")[1]
      } : {
        name : article.imageUrl
      }
      fs.unlink(`public/${filename.name}`, () => {
        Article.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Article effacé."
              });
            } else {
              res.send({
                message: "Erreur lors de la supression de cet article"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Impossible de supprimer cet article."
            });
          });
      })
    })
    .catch(e => {
      console.log(e)
    })
};