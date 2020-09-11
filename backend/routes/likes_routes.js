module.exports = app => {
    const router = require("express").Router();

    const likes = require("../controllers/likes_controllers");
  
    const auth = require("../middleware/auth")
  
    // Create a new Like
    router.post("/", auth, likes.create);

    //Find Likes by ArticleId
    router.get("/articles/:id", auth, likes.findByArticleId);
  
    app.use('/api/likes', router);
  };