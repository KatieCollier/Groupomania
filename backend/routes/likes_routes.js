module.exports = app => {
    const likes = require("../controllers/likes_controllers");
  
    var router = require("express").Router();
  
    // Create a new Like
    router.post("/", likes.create);

    //Find Likes by article id
    router.get("/articles/:id", likes.findByArticleId);
  
    // Retrieve all Likes
    router.get("/", likes.findAll);
  
    app.use('/api/likes', router);
  };