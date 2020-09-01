module.exports = app => {
    const comments = require("../controllers/comments_controllers");
  
    var router = require("express").Router();
  
    // Create a new Article
    router.post("/", comments.create);
  
    // Retrieve all articles
    router.get("/", comments.findAll);

    // Find comments by articleId
    router.get("/articles/:id", comments.findByArticleId);

    //Find a comment by id
    router.get("/:id", comments.findOne);

    //Update a comment with id
    router.put("/:id", comments.update);

    //Delete a comment with id
    router.delete("/:id", comments.delete);
  
    app.use('/api/comments', router);
  };