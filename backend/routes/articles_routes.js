module.exports = app => {
    const router = require("express").Router();

    const articles = require("../controllers/articles_controllers");
    const auth = require("../middleware/auth");
  
    // Create a new Article
    router.post("/", articles.create);
  
    // Retrieve all articles
    router.get("/",  articles.findAllSearch);

    // Retrieve a single Article with id
    router.get("/:id", articles.findOne);

    // Update an Article with id
    router.put("/:id", articles.update);

    // Delete an Article with id
    router.delete("/:id", articles.delete);
  
    app.use('/api/articles', router);
  };