module.exports = app => {
    const router = require("express").Router();

    const commentLikes = require("../controllers/commentLikes_controllers");
  
    const auth = require("../middleware/auth")
  
    // Create a new Like
    router.post("/", auth, commentLikes.create);

    //Find Likes by comment id
    router.get("/comments/:id", auth, commentLikes.findByCommentId);
  
    app.use('/api/commentLikes', router);
  };