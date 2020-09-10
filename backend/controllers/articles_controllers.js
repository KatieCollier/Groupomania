const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

const fs = require("fs");

// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
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
exports.findAllSearch = (req, res) => {
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
            err.message || "Some error occurred while retrieving user info."
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
        message: "Error retrieving Article with id=" + id
      });
    });
};

// Update an Article identified by id
exports.updateWithImage = (req, res) => {  
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
          message: "Article was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Articles with id=" + id
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
                message: "Article was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Article with id=" + id
            });
          });
      })
    })
    .catch(e => {
      console.log(e)
    })
};