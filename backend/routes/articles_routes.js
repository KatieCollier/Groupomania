module.exports = app => {
    const router = require("express").Router();

    const articles = require("../controllers/articles_controllers");
    const auth = require("../middleware/auth");
  
    // Create a new Article
    router.post("/", auth, articles.create);
  
    // Retrieve all articles
    router.get("/",  articles.findAll);

    // Retrieve a single Article with id
    router.get("/:id", auth, articles.findOne);

    // Update an Article with id
    router.put("/:id", auth, articles.update);

    // Delete an Article with id
    router.delete("/:id", auth, articles.delete);
  
    app.use('/api/articles', router);
  };