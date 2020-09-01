module.exports = app => {
    const comments = require("../controllers/comments_controllers");
  
    var router = require("express").Router();
  
    // Create a new Article
    router.post("/", comments.create);
  
    // Retrieve all articles
    router.get("/", comments.findAll);

    // Find comments by articleId
    router.get("/articles/:id", comments.findByArticleId);
  
    app.use('/api/comments', router);
  };