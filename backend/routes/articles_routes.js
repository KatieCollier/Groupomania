module.exports = app => {
    const router = require("express").Router();

    const articles = require("../controllers/articles_controllers");
    const {articleValidationRules, validate} = require("../middleware/article_validator");
    
    const auth = require("../middleware/auth");
    const multer = require("../middleware/multer-config")
  
    // Create a new Article
    router.post("/", auth, multer, articleValidationRules(), validate, articles.create);
  
    // Retrieve all Articles (by page and keyword if available)
    router.get("/", auth, articles.findAll);

    // Retrieve a single Article with id
    router.get("/:id", auth, articles.findOne);

    // Update an Article with id
    router.put("/:id", auth, multer, articleValidationRules(), validate, articles.update);

    // Delete an Article with id
    router.delete("/:id", auth, articles.delete);
  
    app.use('/api/articles', router);
  };