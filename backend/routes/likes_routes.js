module.exports = app => {
    const likes = require("../controllers/likes_controllers");
  
    var router = require("express").Router();
  
    // Create a new Article
    router.post("/", likes.create);
  
    // Retrieve all articles
    router.get("/", likes.findAll);
  
    app.use('/api/likes', router);
  };