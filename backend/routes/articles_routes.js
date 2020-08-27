module.exports = app => {
    const articles = require("../controllers/articles_controllers");
  
    var router = require("express").Router();
  
    // Create a new Article
    router.post("/", articles.create);
  
    // Retrieve all articles
    router.get("/", articles.findAll);

    // Retrieve a single Article with id
    router.get("/:id", articles.findOne);
  
    app.use('/api/articles', router);
  };