module.exports = app => {
    const router = require("express").Router();

    const comments = require("../controllers/comments_controllers");
  
    const auth = require("../middleware/auth");
  
    // Create a new Comment
    router.post("/", auth, comments.create);
  
    // Retrieve all Comments
    router.get("/", auth, comments.findAll);

    // Find Comments by articleId
    router.get("/articles/:id", auth, comments.findByArticleId);

    //Find a comment by id
    router.get("/:id", auth, comments.findOne);

    //Update a comment with id
    router.put("/:id", auth, comments.update);

    //Delete a comment with id
    router.delete("/:id", auth, comments.delete);
  
    app.use('/api/comments', router);
  };