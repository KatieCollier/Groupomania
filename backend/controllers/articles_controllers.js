const fs = require("fs");
const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

// Create and Save a new Article
exports.create = (req, res) => {
    const article = req.file ? //define article if there is also an image
      {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        imageUrl:  `${req.protocol}://${req.get('host')}/${req.file.filename}`
      } : { //define article if there is no image attached
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
  //condition requires the title to contain the keyword if the keyword is available
  const condition = keyword ? {title: {[Op.like]: `%${keyword}%`} }: null
  const page = req.query.page; //page the user is on
  
    Article.findAndCountAll({
      limit: 5, //number of articles per page
      offset: 5*page, //number of articles to skip before showing the results
      order: [["updatedAt", "DESC"]], // order articles from the most recently updated to the least recently updated
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

  const data = req.file ?
   {//define the new article data if there is also an image
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`
  } : { //define the new article data if there is no image attached
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId
  }

  Article.findByPk(id)
    .then(article => {
      const filename = article.imageUrl ? {
        name: article.imageUrl.split("3000/")[1]
      }: {
        name : article.imageUrl
      }
      fs.unlink(`public/${filename.name}`, () => {
        Article.update(data, {
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
      })
    }) 
};

//Delete an article with a specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.findByPk(id) //find the article by its id
    .then(article => {
      const filename = article.imageUrl ? { //if this article is associated to an image, get the image's filename
        name: article.imageUrl.split("3000/")[1]
      } : {
        name : article.imageUrl
      }
      fs.unlink(`public/${filename.name}`, () => { //remove the associated image from the public directory
        Article.destroy({ //delete the article
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
    .catch(err => {
      console.log(err)
    })
};