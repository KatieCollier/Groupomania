const db = require("../models");
const Like = db.likes;
const Op = db.Sequelize.Op;

// Create and Save a new Like
exports.create = (req, res) => {
      
    // Create an Like
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
            err.message || "Some error occurred during signup."
        });
      });
  };

// Retrieve all likes from the database.
exports.findAll = (req, res) => {
  
    Like.findAll()
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