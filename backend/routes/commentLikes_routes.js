module.exports = app => {
    const router = require("express").Router();

    const commentLikes = require("../controllers/commentLikes_controllers");
  
    const auth = require("../middleware/auth")
  
    // Create a new CommentLike
    router.post("/", auth, commentLikes.create);

    //Find CommentLikes by Comment id
    router.get("/comments/:id", auth, commentLikes.findByCommentId);
  
    app.use('/api/commentLikes', router);
  };